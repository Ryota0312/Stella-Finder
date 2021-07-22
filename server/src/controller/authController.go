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

	user := db.FindUser(json.LoginName, json.Password)
	println(user[0].UserName)

	c.JSON(http.StatusOK, "ok")
}
