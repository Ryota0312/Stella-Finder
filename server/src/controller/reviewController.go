package controller

import (
	"github.com/gin-contrib/sessions"
	"strconv"
	"time"

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

type GetReviewListOutputForm struct {
	Id        int       `json:"id"`
	SpotId    int       `json:"spotId"`
	Darkness  int       `json:"darkness"`
	View      int       `json:"view"`
	Safety    int       `json:"safety"`
	Comment   string    `json:"comment"`
	CreatedBy int       `json:"createdBy"`
	CreatedAt time.Time `json:"createdAt"`
	Images    []string  `json:"images"`
}

func GetReviewList(c *gin.Context) {
	spotId, _ := strconv.Atoi(c.Query("spotId"))

	reviews := db.FindReviews(spotId)

	var output []GetReviewListOutputForm
	for _, review := range reviews {
		var images []string
		reviewImages := db.FindReviewImages(review.Id)
		for _, reviewImage := range reviewImages {
			images = append(images, reviewImage.Image)
		}
		output = append(output, GetReviewListOutputForm{
			review.Id,
			review.SpotId,
			review.Darkness,
			review.View,
			review.Safety,
			review.Comment,
			review.CreatedBy,
			review.CreatedAt,
			images,
		})
	}

	c.JSON(200, output)
}