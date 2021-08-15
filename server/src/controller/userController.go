package controller

import (
	"github.com/gin-contrib/sessions"
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
	var loginUser string
	v := session.Get("loginName")
	if v == nil {
		response := User{
			Id:   0,
			Name: "Guest",
		}

		c.JSON(http.StatusOK, response)
		return
	} else {
		loginUser = v.(string)
	}
	print("DEBUG:===")
	print(loginUser)

	user := User{
		Id:   1,
		Name: loginUser,
	}

	c.JSON(http.StatusOK, user)
}
