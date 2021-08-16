package controller

import (
	"github.com/gin-contrib/sessions"
	. "stella-finder-server/src/utils"

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
	loginUser, err := GetLoginUserFromSession(session)
	if err != nil {
		c.JSON(http.StatusOK, User{
			Id:   0,
			Name: loginUser,
		})
		return
	}

	user := User{
		Id:   1, // TODO: 正しいidを使用する
		Name: loginUser,
	}

	c.JSON(http.StatusOK, user)
}
