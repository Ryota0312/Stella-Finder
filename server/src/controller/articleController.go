package controller

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
	"stella-finder-server/src/models/db"
	. "stella-finder-server/src/utils"
	"strconv"
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

	if *loginUser.IsAdmin == false {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "管理者ユーザーのみ利用可能な機能です"})
		return
	}

	article := db.CreateArticle(input.Title, input.Body, loginUser.ID)

	c.JSON(200, gin.H{"id": article.ID})
}

func GetArticleList(c *gin.Context) {
	limit, _ := strconv.Atoi(c.Query("limit"))

	c.JSON(http.StatusOK, db.FindAllArticle(limit))
}

func GetArticle(c *gin.Context) {
	articleId, _ := strconv.Atoi(c.Query("articleId"))

	c.JSON(http.StatusOK, db.FindArticleById(articleId))
}

func GetArticleListByTag(c *gin.Context) {
	tagId, _ := strconv.Atoi(c.Query("id"))

	c.JSON(http.StatusOK, db.FindArticleByTag(tagId))
}
