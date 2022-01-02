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

type UpdateReportInputForm struct {
	Id         int    `json:"id"`
	Title      string `json:"title"`
	Body       string `json:"body"`
	CoverImage string `json:"coverImage"`
}

func UpdateReport(c *gin.Context) {
	var input UpdateReportInputForm
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

	report, err := db.UpdateReport(input.Id, loginUser.ID, input.Title, input.Body, input.CoverImage)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"id": report.ID})
}

type DeleteReportInputForm struct {
	Id int `json:"id"`
}

func DeleteReport(c *gin.Context) {
	var input DeleteReportInputForm
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

	err = db.DeleteReport(input.Id, loginUser.ID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

type ReportLikeInputForm struct {
	ReportId int `json:"reportId"`
}

func ReportLike(c *gin.Context) {
	var input ReportLikeInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.IncrementReportLikeCount(input.ReportId)

	c.JSON(http.StatusOK, gin.H{})
}
