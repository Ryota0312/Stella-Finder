package controller

import (
	// 文字列と基本データ型の変換パッケージ
	strconv "strconv"

	// Gin
	"github.com/gin-gonic/gin"

	// DBアクセス用モジュール
	db "stella-finder-server/src/models/db"
)

func GetSpots(c *gin.Context) {
	spotId := c.Query("id")

	productID, _ := strconv.Atoi(spotId)

	resultProduct := db.FindSpot(productID)

	// URLへのアクセスに対してJSONを返す
	c.JSON(200, resultProduct)
}
