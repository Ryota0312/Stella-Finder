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
	if input.Darkness == 0 || input.View == 0 || input.Safety == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "空の暗さ、見晴らし、安全性の評価が入力されていません"})
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

	reviews := db.FindReviews(input.SpotId)
	reviewCount := len(reviews)
	total := 0.0
	darkness := 0.0
	view := 0.0
	safety := 0.0
	for _, review := range reviews {
		total += float64((review.Darkness + review.View + review.Safety) / 3)
		darkness += float64(review.Darkness)
		view += float64(review.View)
		safety += float64(review.Safety)
	}
	total /= float64(reviewCount)
	darkness /= float64(reviewCount)
	view /= float64(reviewCount)
	safety /= float64(reviewCount)
	db.UpdateReviewPoint(input.SpotId, total, darkness, view, safety, reviewCount)

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
	LikeCount int       `json:"likeCount"`
}

func GetReviewList(c *gin.Context) {
	spotId, _ := strconv.Atoi(c.Query("spotId"))

	reviews := db.FindReviews(spotId)

	var output []GetReviewListOutputForm
	output = []GetReviewListOutputForm{}
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
			review.LikeCount,
		})
	}

	c.JSON(200, output)
}

type GetSummaryOutputForm struct {
	Total    float64 `json:"total"`
	Darkness float64 `json:"darkness"`
	View     float64 `json:"view"`
	Safety   float64 `json:"safety"`
}

func GetSummary(c *gin.Context) {
	spotId, _ := strconv.Atoi(c.Query("spotId"))

	reviews := db.FindReviews(spotId)

	var count = 0
	var darknessSum = 0
	var viewSum = 0
	var safetySum = 0
	for i, review := range reviews {
		count = i + 1
		darknessSum += review.Darkness
		viewSum += review.View
		safetySum += review.Safety
	}

	var darknessAvg = 0.0
	var viewAvg = 0.0
	var safetyAvg = 0.0
	if count > 0 {
		darknessAvg = float64(darknessSum) / float64(count)
		viewAvg = float64(viewSum) / float64(count)
		safetyAvg = float64(safetySum) / float64(count)
	}
	total := (darknessAvg + viewAvg + safetyAvg) / 3.0
	output := GetSummaryOutputForm{total, darknessAvg, viewAvg, safetyAvg}

	c.JSON(http.StatusOK, output)
}

type LikeInputForm struct {
	ReviewId int `json:"reviewId"`
}

func Like(c *gin.Context) {
	var input LikeInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.IncrementLikeCount(input.ReviewId)

	c.JSON(http.StatusOK, gin.H{})
}
