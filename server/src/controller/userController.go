package controller

import (
	"github.com/gin-contrib/sessions"
	"stella-finder-server/src/models/db"
	. "stella-finder-server/src/utils"
	"strconv"

	// Gin
	"github.com/gin-gonic/gin"
	"net/http"
)

type User struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

func GetLoginUser(c *gin.Context) {
	session := sessions.Default(c)
	loginUserMailAddress, err := GetLoginUserMailAddressFromSession(session)
	if err != nil {
		c.JSON(http.StatusOK, User{
			Id:   0,
			Name: "ゲスト",
		})
		return
	}

	userEntity, err := db.FindUserByMailAddress(loginUserMailAddress)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Cannot find user")
		return
	}

	user := User{
		Id:   userEntity.ID,
		Name: userEntity.UserName,
	}

	c.JSON(http.StatusOK, user)
}

func GetUser(c *gin.Context) {
	userId, _ := strconv.Atoi(c.Query("id"))

	result := db.FindUserById(userId)

	c.JSON(200, result)
}

type UpdateUserInputForm struct {
	UserId   int    `json:"id"`
	UserName string `json:"userName"`
}

func UpdateUser(c *gin.Context) {
	var input UpdateUserInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.UpdateUser(input.UserId, input.UserName)
	c.JSON(200, nil)
}
