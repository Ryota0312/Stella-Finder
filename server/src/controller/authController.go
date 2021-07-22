package controller

import (
	// Gin
	"github.com/gin-gonic/gin"
	"hoshi-atsume-server/src/models/db"
	"net/http"
)

type JsonRequest struct {
	LoginName string `json:"loginName"`
	Password  string `json:"password"`
}

func Auth(c *gin.Context) {
	var json JsonRequest
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := db.FindUser(json.LoginName)
	if len(user) == 0 {
		c.JSON(http.StatusOK, "Invalid loginName")
		return
	}
	println(user[0].UserName)

	if user[0].Password != json.Password {
		c.JSON(http.StatusOK, "Incorrect password")
		return
	}

	c.JSON(http.StatusOK, "Login success")
}
