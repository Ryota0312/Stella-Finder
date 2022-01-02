package controller

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
	"stella-finder-server/src/models/db"
	. "stella-finder-server/src/utils"
	"strconv"
)

type CreateReportInputForm struct {
	SpotId     int      `json:"spotId"`
	Title      string   `json:"title"`
	Body       string   `json:"body"`
	CoverImage string   `json:"coverImage"`
	Tags       []string `json:"tags"`
}

func CreateReport(c *gin.Context) {
	var input CreateReportInputForm
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

	report := db.CreateReport(input.SpotId, input.Title, input.Body, input.CoverImage, loginUser.ID)

	c.JSON(200, gin.H{"id": report.ID})
}

func GetReportList(c *gin.Context) {
	limit, _ := strconv.Atoi(c.Query("limit"))

	c.JSON(http.StatusOK, db.FindAllReport(limit))
}

func GetReportListBySpotId(c *gin.Context) {
	spotId, _ := strconv.Atoi(c.Query("spotId"))
	limit, _ := strconv.Atoi(c.Query("limit"))

	c.JSON(http.StatusOK, db.FindReportsBySpotId(spotId, limit))
}

func GetReport(c *gin.Context) {
	reportId, _ := strconv.Atoi(c.Query("reportId"))

	c.JSON(http.StatusOK, db.FindReportById(reportId))
}

//func GetArticleListByTag(c *gin.Context) {
//	tagId, _ := strconv.Atoi(c.Query("id"))
//
//	c.JSON(http.StatusOK, db.FindArticleByTag(tagId))
//}
//
//func GetArticleTags(c *gin.Context) {
//	c.JSON(http.StatusOK, db.GetArticleTags())
//}
//
//type UpdateArticleInputForm struct {
//	Id         int    `json:"id"`
//	Title      string `json:"title"`
//	Body       string `json:"body"`
//	CoverImage string `json:"coverImage"`
//}
//
//func UpdateArticle(c *gin.Context) {
//	var input UpdateArticleInputForm
//	if err := c.ShouldBindJSON(&input); err != nil {
//		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//		return
//	}
//
//	session := sessions.Default(c)
//	loginUserMailAddress, err := GetLoginUserMailAddressFromSession(session)
//	if err != nil {
//		c.JSON(http.StatusInternalServerError, "Cannot find loginUser")
//		return
//	}
//
//	loginUser, err := db.FindUserByMailAddress(loginUserMailAddress)
//	if err != nil {
//		c.JSON(http.StatusInternalServerError, "Cannot find loginUser")
//		return
//	}
//
//	if *loginUser.IsAdmin == false {
//		c.JSON(http.StatusUnauthorized, gin.H{"error": "管理者ユーザーのみ利用可能な機能です"})
//		return
//	}
//
//	// TODO: 作成者以外でも管理者権限を持っていたら編集可能なので注意
//	article := db.UpdateArticle(input.Id, input.Title, input.Body, input.CoverImage)
//
//	c.JSON(200, gin.H{"id": article.ID})
//}
//
//type DeleteArticleInputForm struct {
//	Id int `json:"id"`
//}
//
//func DeleteArticle(c *gin.Context) {
//	var input DeleteArticleInputForm
//	if err := c.ShouldBindJSON(&input); err != nil {
//		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//		return
//	}
//
//	db.DeleteArticle(input.Id)
//
//	c.JSON(200, gin.H{})
//}
