package controller

import (
	"net/http"
	// 文字列と基本データ型の変換パッケージ
	strconv "strconv"

	// Gin
	"github.com/gin-gonic/gin"

	// DBアクセス用モジュール
	db "stella-finder-server/src/models/db"
)

type CreateSpotInputForm struct {
	Name       string `json:"name"`
	Place      string `json:"place"`
	CoverImage string `json:"coverImage"`
}

func CreateSpot(c *gin.Context) {
	var input CreateSpotInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	spot := db.CreateSpot(input.Name, input.Place, input.CoverImage)

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
