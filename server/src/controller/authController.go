package controller

import (
	"github.com/gin-contrib/sessions"
	// Gin
	"github.com/gin-gonic/gin"
	"net/http"
	"stella-finder-server/src/models/db"
)

type LoginInputForm struct {
	LoginName string `json:"loginName"`
	Password  string `json:"password"`
}

func Login(c *gin.Context) {
	var input LoginInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := db.FindUser(input.LoginName)
	if len(user) == 0 {
		c.JSON(http.StatusOK, "Invalid loginName")
		return
	}
	loginUser := user[0]
	println(loginUser.UserName)

	if loginUser.Password != input.Password {
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

type RegisterInputForm struct {
	Mail string `json:"mail"`
}

func Register(c *gin.Context) {
	var input RegisterInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if db.MailAddressExists(input.Mail) {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "E-mail address already exist"})
		return
	}

	c.JSON(http.StatusOK, "Register: email addr is "+input.Mail)
}
