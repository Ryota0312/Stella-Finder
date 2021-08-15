package controller

import (
	"github.com/gin-contrib/sessions"
	// Gin
	"github.com/gin-gonic/gin"
	"net/http"
	"stella-finder-server/src/models/db"
)

type JsonRequest struct {
	LoginName string `json:"loginName"`
	Password  string `json:"password"`
}

func Login(c *gin.Context) {
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
	loginUser := user[0]
	println(loginUser.UserName)

	if loginUser.Password != json.Password {
		c.JSON(http.StatusOK, "Incorrect password")
		return
	}

	session := sessions.Default(c)
	session.Set("loginName", loginUser.LoginName)
	if err := session.Save(); err != nil {
		println("Failed to save session")
		return
	}

	c.JSON(http.StatusOK, "Login success")
}

func Logout(c *gin.Context) {
	session := sessions.Default(c)
	session.Delete("loginName")
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}
	print("DEBUG: Logout success!")
	c.JSON(http.StatusOK, "Logout success")
}
