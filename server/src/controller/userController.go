package controller

import (
	"github.com/gin-contrib/sessions"
	// Gin
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetUser(c *gin.Context) {
	session := sessions.Default(c)
	var loginUser string
	v := session.Get("loginName")
	if v == nil {
		loginUser = "not login"
	} else {
		loginUser = v.(string)
	}
	print("DEBUG:===")
	print(loginUser)

	c.JSON(http.StatusOK, "get")
}
