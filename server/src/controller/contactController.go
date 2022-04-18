package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"stella-finder-server/src/utils"
)

type SendContactInputForm struct {
	MailAddress string `json:"mailAddress"`
	Body        string `json:"body"`
}

func SendContact(c *gin.Context) {
	var input SendContactInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	err := utils.SendContactMail(input.MailAddress, input.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Failed to send contact mail.")
	}

	c.JSON(http.StatusOK, "Login success")
}
