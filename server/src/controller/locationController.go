package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"stella-finder-server/src/utils"
)

func GetAddressBySpotName(c *gin.Context) {
	spotName := c.Query("name")

	output, err := utils.GetAddrByName(spotName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, output)
}
