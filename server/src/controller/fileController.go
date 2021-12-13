package controller

import (
	"bytes"
	"crypto/sha256"
	"fmt"
	"github.com/gin-contrib/sessions"
	"hash"
	"path/filepath"
	"stella-finder-server/src/models/db"
	. "stella-finder-server/src/utils"
	"strconv"

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
	loginUserMailAddress, err := GetLoginUserMailAddressFromSession(session)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Cannot find loginUser")
		return
	}

	loginUser, err := db.FindUserByMailAddress(loginUserMailAddress)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Cannot find loginUser")
		return
	}

	db.CreateFile(fileKey, fileName, loginUser.ID)

	c.JSON(http.StatusOK, gin.H{
		"fileKey": fileKey,
	})
}

func GetFile(c *gin.Context) {
	fileKey := c.Query("fileKey")
	size := c.Query("size")

	if size != "" {
		intSize, _ := strconv.Atoi(size)
		if intSize > 0 {
			resizedImagePath, err := GetResizedImage(fileKey, intSize)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred in resize image"})
				return
			}
			c.File(resizedImagePath)
			return
		}
	}

	c.File(getFilePath(fileKey))
}

func GetFilesByUser(c *gin.Context) {
	userId, err := strconv.Atoi(c.Query("userId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "userId error"})
		return
	}

	files := db.GetFilesByUserId(userId)

	c.JSON(http.StatusOK, files)
}

func getSHA256SumString(fileHash hash.Hash) string {
	return fmt.Sprintf("%x", fileHash.Sum(nil))
}

func getFilePath(fileKey string) string {
	dir, _ := os.Getwd()
	return dir + "/uploadedImages/" + fileKey
}

type DeleteFileInputForm struct {
	FileKey string `json:"fileKey"`
}

func DeleteFile(c *gin.Context) {
	var input DeleteFileInputForm
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	session := sessions.Default(c)
	loginUserMailAddress, err := GetLoginUserMailAddressFromSession(session)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Cannot find loginUser")
		return
	}

	loginUser, err := db.FindUserByMailAddress(loginUserMailAddress)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Cannot find loginUser")
		return
	}

	deleteCount := db.DeleteFile(input.FileKey, loginUser.ID)
	if deleteCount > 0 {
		dir, _ := os.Getwd()
		err = os.Remove(dir + "/uploadedImages/" + input.FileKey)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Cannot remove file in disk")
			return
		}

		resizedImages, err := filepath.Glob(dir + "/uploadedImages/resized/" + input.FileKey + "_s*")
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Cannot get resized image in disk")
			return
		}
		for _, f := range resizedImages {
			if err := os.Remove(f); err != nil {
				c.JSON(http.StatusInternalServerError, "Cannot remove resized image in disk")
				return
			}
		}
	}

	c.JSON(http.StatusOK, "")
}
