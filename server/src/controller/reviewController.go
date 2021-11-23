package controller

import (
	"github.com/gin-contrib/sessions"
	"strconv"

	// Gin
	"github.com/gin-gonic/gin"
	"net/http"
	"stella-finder-server/src/models/db"
	. "stella-finder-server/src/utils"
)

type CreateReviewInputForm struct {
	SpotId   int      `json:"spotId"`
	Darkness int      `json:"darkness"`
	View     int      `json:"view"`
	Safety   int      `json:"safety"`
	Comment  string   `json:"comment"`
	Images   []string `json:"images"`
}

func CreateReview(c *gin.Context) {
	var input CreateReviewInputForm
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

	review := db.CreateReview(input.SpotId, input.Darkness, input.View, input.Safety, input.Comment, loginUser.ID)
	db.CreateReviewImages(review.Id, input.Images)

	c.JSON(200, nil)
}

func GetReviewList(c *gin.Context) {
	spotId, _ := strconv.Atoi(c.Query("spotId"))

	reviews := db.FindReviews(spotId)

	c.JSON(200, reviews)
}
