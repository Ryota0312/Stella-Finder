package controller

import (
	"github.com/gin-contrib/sessions"
	"golang.org/x/crypto/bcrypt"
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
