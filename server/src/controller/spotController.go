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

	location, err := GetLocationBySpotId(BuildAddressQuery(input.Name, input.PostalCode, input.Prefecture, input.Address))
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Failed to get lat and lng")
		return
	}

	spot := db.CreateSpot(input.Name, input.CoverImage, input.PostalCode, input.Prefecture, input.Address, location.Lat, location.Lng, input.Remarks, loginUser.ID)

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
	var prefArray []string
	if prefectures != "" {
		prefectures, _ = url.QueryUnescape(prefectures)
		prefArray = strings.Split(prefectures, " ")
	}

	name := c.Query("name")

	total := c.Query("total")
	totalPoint := 0
	if total != "" {
		totalPoint, _ = strconv.Atoi(total)
	}

	darkness := c.Query("darkness")
	darknessPoint := 0
	if darkness != "" {
		darknessPoint, _ = strconv.Atoi(darkness)
	}

	view := c.Query("view")
	viewPoint := 0
	if view != "" {
		viewPoint, _ = strconv.Atoi(view)
	}

	safety := c.Query("safety")
	safetyPoint := 0
	if safety != "" {
		safetyPoint, _ = strconv.Atoi(safety)
	}

	order := c.Query("order")
	orderKey := ""
	ascDesc := ""
	if order != "" {
		order, _ = url.QueryUnescape(order)
		orderArray := strings.Split(order, " ")
		orderKey = orderArray[0]
		ascDesc = orderArray[1]
	}

	limit := c.Query("limit")
	limitQuery := 0
	if limit != "" {
		limitQuery, _ = strconv.Atoi(limit)
	}

	c.JSON(http.StatusOK, db.SearchSpot(prefArray, name, totalPoint, darknessPoint, viewPoint, safetyPoint, orderKey, ascDesc, limitQuery))
}

type UpdateSpotInputForm struct {
	SpotId     int    `json:"spotId"`
	SpotName   string `json:"spotName"`
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

	if db.SpotNameExistsExcludeId(input.SpotId, input.SpotName) {
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

	location, err := GetLocationBySpotId(BuildAddressQuery(input.SpotName, input.PostalCode, input.Prefecture, input.Address))
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Failed to get lat and lng")
		return
	}

	db.UpdateSpot(input.SpotId, input.SpotName, input.CoverImage, input.PostalCode, input.Prefecture, input.Address, location.Lat, location.Lng, input.Remarks, loginUser.ID)
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

func GetSpotsByName(c *gin.Context) {
	spotName := c.Query("spotName")

	c.JSON(http.StatusOK, db.FindSpotByName(spotName))
}
