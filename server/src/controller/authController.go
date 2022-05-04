package controller

import (
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"github.com/gin-contrib/sessions"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"io/ioutil"
	"log"
	"os"
	"stella-finder-server/src/utils"
	"time"
	// Gin
	"github.com/gin-gonic/gin"
	"net/http"
	"stella-finder-server/src/models/db"
	. "stella-finder-server/src/utils"
)

func Check(c *gin.Context) {
	session := sessions.Default(c)
	_, err := GetLoginUserMailAddressFromSession(session)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"authorized": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{"authorized": true})
}

func CheckAdmin(c *gin.Context) {
	session := sessions.Default(c)
	loginUserMailAddress, err := GetLoginUserMailAddressFromSession(session)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"authorized": false})
		return
	}

	loginUser, err := db.FindUserByMailAddress(loginUserMailAddress)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"authorized": false})
		return
	}

	if *loginUser.IsAdmin == false {
		c.JSON(http.StatusUnauthorized, gin.H{"authorized": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{"authorized": true})
}

type LoginInputForm struct {
	MailAddress string `json:"mailAddress"`
	Password    string `json:"password"`
}

func Login(c *gin.Context) {
	var input LoginInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	loginUser, err := db.FindUserByMailAddress(input.MailAddress)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "メールアドレスまたはパスワードが間違っています"})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(loginUser.Password), []byte(input.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "メールアドレスまたはパスワードが間違っています"})
		return
	}

	session := sessions.Default(c)
	session.Set("mailAddress", loginUser.MailAddress)
	if err := session.Save(); err != nil {
		println("Failed to save session")
		return
	}

	c.JSON(http.StatusOK, "Login success")
}

func Logout(c *gin.Context) {
	session := sessions.Default(c)
	session.Delete("mailAddress")
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}
	print("DEBUG: Logout success!")
	c.JSON(http.StatusOK, "Logout success")
}

type TmpRegisterInputForm struct {
	Mail string `json:"mail"`
}

func TmpRegister(c *gin.Context) {
	var input TmpRegisterInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if db.MailAddressExists(input.Mail) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "このメールアドレスはすでに使用されています"})
		return
	}

	tmpRegisterKey := utils.RandString(128)

	db.CreateTmpUser(input.Mail)
	db.CreateTmpRegister(tmpRegisterKey, input.Mail)

	utils.SendTmpRegisterMail(input.Mail, tmpRegisterKey)

	c.JSON(http.StatusOK, "Tmpregister: email addr is "+input.Mail)
}

type RegisterInputForm struct {
	RegisterKey string `json:"registerKey"`
	UserName    string `json:"userName"`
	Password    string `json:"password"`
}

func Register(c *gin.Context) {
	var input RegisterInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: サーバーでもバリデーションを行う

	tmpRegister := db.FindTmpRegister(input.RegisterKey)

	if tmpRegister.CreatedAt.Before(time.Now().Add(-24 * time.Hour)) {
		db.DeleteTmpRegister(tmpRegister.RegisterKey)
		db.DeleteTemporaryUser(tmpRegister.MailAddress)
		c.JSON(http.StatusBadRequest, gin.H{"error": "仮登録の有効期限が切れています。ユーザー登録をやり直してください。"})
		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), 10)

	db.UpdateTmpUser(tmpRegister.MailAddress, input.UserName, string(hashedPassword))
	db.DeleteTmpRegister(tmpRegister.RegisterKey)

	c.JSON(http.StatusOK, "Register success!")
}

type TwitterLoginOutputForm struct {
	ClientId            string `json:"clientId"`
	RedirectUri         string `json:"redirectUri"`
	Scope               string `json:"scope"`
	State               string `json:"state"`
	CodeChallenge       string `json:"codeChallenge"`
	CodeChallengeMethod string `json:"codeChallengeMethod"`
}

func TwitterLoginPrepare(c *gin.Context) {
	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Fatalf("error: %v", loadErr)
	}
	TWITTER_CLIENT_ID := os.Getenv("TWITTER_CLIENT_ID")

	codeVerifier := RandString(128)
	codeChallenge := sha256.Sum256([]byte(codeVerifier))
	codeChallengeURL := base64.RawURLEncoding.EncodeToString(codeChallenge[:])
	state := RandString(64)

	cacheDb := utils.NewCacheDb()
	defer cacheDb.CloseCacheDb()
	err := cacheDb.Set(state, []byte(codeVerifier), 60*10)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Cache error")
		return
	}

	output := TwitterLoginOutputForm{
		ClientId:            TWITTER_CLIENT_ID,
		RedirectUri:         "https://stella-finder.com/loginWithTwitter",
		Scope:               "users.read tweet.read",
		State:               state,
		CodeChallenge:       codeChallengeURL,
		CodeChallengeMethod: "s256",
	}

	c.JSON(http.StatusOK, output)
}

type TwitterLoginInputForm struct {
	State string `json:"state"`
	Code  string `json:"code"`
}

type TwitterOAuthToken struct {
	AccessToken string `json:"access_token"`
}

type TwitterUserInfo struct {
	Data struct {
		Id       string `json:"id"`
		Name     string `json:"name"`
		UserName string `json:"username"`
	} `json:"data"`
}

func TwitterLogin(c *gin.Context) {
	var input TwitterLoginInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Fatalf("error: %v", loadErr)
	}
	TWITTER_CLIENT_ID := os.Getenv("TWITTER_CLIENT_ID")
	TWITTER_CLIENT_SECRET := os.Getenv("TWITTER_CLIENT_SECRET")

	cacheDb := utils.NewCacheDb()
	defer cacheDb.CloseCacheDb()
	codeVerifier, err := cacheDb.Get(input.State)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Cache error")
		return
	}

	url := "https://api.twitter.com/2/oauth2/token?grant_type=authorization_code" +
		"&code=" + input.Code +
		"&client_id=" + TWITTER_CLIENT_ID +
		"&redirect_uri=" + "https://stella-finder.com/loginWithTwitter" +
		"&code_verifier=" + string(codeVerifier)
	req, _ := http.NewRequest("POST", url, nil)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.SetBasicAuth(TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET)

	client := new(http.Client)
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	responseBody, _ := ioutil.ReadAll(resp.Body)

	var token TwitterOAuthToken
	if err := json.Unmarshal(responseBody, &token); err != nil {
		c.JSON(http.StatusInternalServerError, "Internal server error")
		return
	}

	req, _ = http.NewRequest("GET", "https://api.twitter.com/2/users/me", nil)
	req.Header.Set("Authorization", "Bearer "+token.AccessToken)
	resp, _ = client.Do(req)
	defer resp.Body.Close()
	responseBody, _ = ioutil.ReadAll(resp.Body)

	var userInfo TwitterUserInfo
	if err := json.Unmarshal(responseBody, &userInfo); err != nil {
		c.JSON(http.StatusInternalServerError, "Internal server error")
		return
	}

	userIdSimilarToMailAddress := userInfo.Data.Id + "@twitter"

	if !db.MailAddressExists(userIdSimilarToMailAddress) {
		db.CreateUserWithSNSLogin(userInfo.Data.Name, userIdSimilarToMailAddress)
	}

	session := sessions.Default(c)
	session.Set("mailAddress", userIdSimilarToMailAddress)
	if err := session.Save(); err != nil {
		println("Failed to save session")
		return
	}

	c.JSON(http.StatusOK, "Login success")
}

type PrepareChangePasswordInputForm = struct {
	MailAddress string `json:"mailAddress"`
}

func PrepareChangePassword(c *gin.Context) {
	var input PrepareChangePasswordInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !db.MailAddressExists(input.MailAddress) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "このメールアドレスは登録されていません"})
		return
	}

	resetCode := utils.RandString(128)

	cacheDb := utils.NewCacheDb()
	defer cacheDb.CloseCacheDb()
	err := cacheDb.Set(resetCode, []byte(input.MailAddress), 60*10)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Cache error")
		return
	}

	utils.SendChangePasswordMail(input.MailAddress, resetCode)

	c.JSON(http.StatusOK, "Reset password: email addr is "+input.MailAddress)
}

type ChangePasswordInputForm = struct {
	ResetCode string `json:"resetCode"`
	Password  string `json:"password"`
}

func ChangePassword(c *gin.Context) {
	var input ChangePasswordInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cacheDb := utils.NewCacheDb()
	defer cacheDb.CloseCacheDb()
	mailAddress, _ := cacheDb.Get(input.ResetCode)
	if mailAddress != nil {
		user, err := db.FindUserByMailAddress(string(mailAddress))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Internal server error."})
			return
		}
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), 10)
		db.ChangePassword(user.ID, string(hashedPassword))

		c.JSON(http.StatusOK, "Success change password")
		return
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "再設定用URLが有効期限切れまたは間違っています"})
		return
	}
}
