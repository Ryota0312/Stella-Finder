package controller

import (
	"bytes"
	"crypto/sha256"
	"fmt"
	"github.com/gin-contrib/sessions"
	"hash"
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

	fileHash := sha256.New()
	fileBody := bytes.NewBuffer(nil)
	writer := io.MultiWriter(fileHash, fileBody)
	_, err = io.Copy(writer, file)
	if err != nil {
		return
	}

	fileKey := getSHA256SumString(fileHash)
	if err != nil {
		return
	}

	fileName := header.Filename
	dir, _ := os.Getwd()
	out, err := os.Create(dir + "/uploadedImages/" + fileKey)
	if err != nil {
		log.Fatal(err)
	}
	defer out.Close()
	_, err = io.Copy(out, fileBody)
	if err != nil {
		log.Fatal(err)
	}

	session := sessions.Default(c)
	loginUser, _ := GetLoginUserMailAddressFromSession(session)
	db.CreateFile(fileKey, fileName, loginUser)

	c.JSON(http.StatusOK, gin.H{
		"fileKey": fileKey,
	})
}

func GetFile(c *gin.Context) {
	fileKey := c.Query("fileKey")

	c.File(getFilePath(fileKey))
}

func getSHA256SumString(fileHash hash.Hash) string {
	return fmt.Sprintf("%x", fileHash.Sum(nil))
}

func getFilePath(fileKey string) string {
	dir, _ := os.Getwd()
	return dir + "/uploadedImages/" + fileKey
}
