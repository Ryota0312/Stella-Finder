package controller

import (
	"crypto/sha256"
	"fmt"
	"github.com/gin-contrib/sessions"
	"mime/multipart"
	"stella-finder-server/src/models/db"
	. "stella-finder-server/src/utils"

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

	fileSha256Sum, err := getSHA256SumString(file)
	print(fileSha256Sum)
	if err != nil {
		return
	}

	fileName := header.Filename
	dir, _ := os.Getwd()
	out, err := os.Create(dir + "/uploadedImages/" + fileSha256Sum)
	if err != nil {
		log.Fatal(err)
	}
	defer out.Close()
	_, err = io.Copy(out, file)
	if err != nil {
		log.Fatal(err)
	}

	session := sessions.Default(c)
	loginUser, _ := GetLoginUserFromSession(session)
	db.CreateFile(fileSha256Sum, fileName, loginUser)

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}

func getSHA256SumString(file multipart.File) (string, error) {
	var fileByte []byte
	_, err := file.Read(fileByte)
	if err != nil {
		return "", err
	}
	sha256Sum := sha256.Sum256(fileByte)
	return fmt.Sprintf("%x", sha256Sum), nil
}
