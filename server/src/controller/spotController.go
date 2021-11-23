package controller

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
	"stella-finder-server/src/models/db"
	. "stella-finder-server/src/utils"
	"strconv"
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
	c.JSON(200, db.AllSpots())
}

type UpdateSpotInputForm struct {
	SpotId     int    `json:"spotId"`
	CoverImage string `json:"coverImage"`
}

func UpdateSpot(c *gin.Context) {
	var input UpdateSpotInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.UpdateSpot(input.SpotId, input.CoverImage)
	c.JSON(200, nil)
}
