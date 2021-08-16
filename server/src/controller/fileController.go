package controller

import (

	// Gin
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"net/http"
	"os"
)

func CreateFile(c *gin.Context) {
	file, header, err := c.Request.FormFile("image")
	if err != nil {
		c.String(http.StatusBadRequest, "Bad request")
		return
	}
	fileName := header.Filename
	dir, _ := os.Getwd()
	out, err := os.Create(dir + "/uploadedImages/" + fileName)
	if err != nil {
		log.Fatal(err)
	}
	defer out.Close()
	_, err = io.Copy(out, file)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}
