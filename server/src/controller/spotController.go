package controller

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/url"
	"stella-finder-server/src/models/db"
	. "stella-finder-server/src/utils"
	"strconv"
	"strings"
)

type CreateSpotInputForm struct {
	Name       string `json:"name"`
	CoverImage string `json:"coverImage"`
	PostalCode string `json:"postalCode"`
	Prefecture string `json:"prefecture"`
	Address    string `json:"address"`
	Remarks    string `json:"remarks"`
}

func CreateSpot(c *gin.Context) {
	var input CreateSpotInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if db.SpotNameExists(input.Name) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "このスポット名はすでに登録されています"})
		return
	}

	session := sessions.Default(c)
	loginUserMailAddress, err := GetLoginUserMailAddressFromSession(session)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Cannot find loginUser")
		return
	}

	loginUser, err := db.FindUserByMailAddress(loginUserMailAddress)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Cannot find loginUser")
		return
	}

	spot := db.CreateSpot(input.Name, input.CoverImage, input.PostalCode, input.Prefecture, input.Address, input.Remarks, loginUser.ID)

	c.JSON(200, gin.H{"id": spot.ID})
}

func GetSpot(c *gin.Context) {
	spotId, _ := strconv.Atoi(c.Query("id"))

	result := db.FindSpot(spotId)

	// URLへのアクセスに対してJSONを返す
	c.JSON(200, result)
}

func GetAllSpots(c *gin.Context) {
	prefectures := c.Query("pref")

	if prefectures == "" {
		c.JSON(http.StatusOK, db.AllSpots())
	} else {
		prefectures, _ = url.QueryUnescape(prefectures)
		prefArray := strings.Split(prefectures, " ")
		c.JSON(http.StatusOK, db.FindSpotByPrefecture(prefArray))
	}
}

type UpdateSpotInputForm struct {
	SpotId     int    `json:"spotId"`
	CoverImage string `json:"coverImage"`
	PostalCode string `json:"postalCode"`
	Prefecture string `json:"prefecture"`
	Address    string `json:"address"`
	Remarks    string `json:"remarks"`
}

func UpdateSpot(c *gin.Context) {
	var input UpdateSpotInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	session := sessions.Default(c)
	loginUserMailAddress, err := GetLoginUserMailAddressFromSession(session)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Cannot find loginUser")
		return
	}

	loginUser, err := db.FindUserByMailAddress(loginUserMailAddress)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Cannot find loginUser")
		return
	}

	db.UpdateSpot(input.SpotId, input.CoverImage, input.PostalCode, input.Prefecture, input.Address, input.Remarks, loginUser.ID)
	c.JSON(200, nil)
}

type CreateSpotImageInputForm struct {
	SpotId int    `json:"spotId"`
	Image  string `json:"image"`
}

func CreateSpotImage(c *gin.Context) {
	var input CreateSpotImageInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.CreateSpotImage(input.SpotId, input.Image)
	c.JSON(200, nil)
}

func GetSpotImages(c *gin.Context) {
	spotId, _ := strconv.Atoi(c.Query("spotId"))

	result := db.GetAllSpotImages(spotId)
	c.JSON(http.StatusOK, result)
}
