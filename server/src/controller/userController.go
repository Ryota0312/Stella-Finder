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

type UserOutputForm struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	MailAddress string `json:"mailAddress"`
	Icon        string `json:"icon"`
}

func GetLoginUser(c *gin.Context) {
	session := sessions.Default(c)
	loginUserMailAddress, err := GetLoginUserMailAddressFromSession(session)
	if err != nil {
		c.JSON(http.StatusOK, UserOutputForm{
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

	user := UserOutputForm{
		Id:          userEntity.ID,
		Name:        userEntity.UserName,
		Icon:        userEntity.Icon,
		MailAddress: userEntity.MailAddress,
	}

	c.JSON(http.StatusOK, user)
}

func GetUser(c *gin.Context) {
	userId, _ := strconv.Atoi(c.Query("id"))

	result := db.FindUserById(userId)
	output := UserOutputForm{result.ID, result.UserName, result.MailAddress, result.Icon}

	c.JSON(200, output)
}

type UpdateUserInputForm struct {
	UserName string `json:"userName"`
	Icon     string `json:"icon"`
}

func UpdateUser(c *gin.Context) {
	var input UpdateUserInputForm
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

	if input.Icon == "" {
		db.UpdateUser(loginUser.ID, input.UserName)
	} else {
		db.UpdateUserIcon(loginUser.ID, input.Icon)
	}
	c.JSON(200, nil)
}
