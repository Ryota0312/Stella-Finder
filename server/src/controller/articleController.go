package controller

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
	"stella-finder-server/src/models/db"
	. "stella-finder-server/src/utils"
)

type CreateArticleInputForm struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

func CreateArticle(c *gin.Context) {
	var input CreateArticleInputForm
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

	article := db.CreateArticle(input.Title, input.Body, loginUser.ID)

	c.JSON(200, gin.H{"id": article.ID})
}
