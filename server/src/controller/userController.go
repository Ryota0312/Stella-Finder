package controller

import (
	"github.com/gin-contrib/sessions"
	"stella-finder-server/src/models/db"
	. "stella-finder-server/src/utils"

	// Gin
	"github.com/gin-gonic/gin"
	"net/http"
)

type User struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

func GetLoginUser(c *gin.Context) {
	session := sessions.Default(c)
	loginUserMailAddress, err := GetLoginUserMailAddressFromSession(session)
	if err != nil {
		c.JSON(http.StatusOK, User{
			Id:   0,
			Name: "ゲスト",
		})
		return
	}

	userEntity := db.FindUser(loginUserMailAddress)

	user := User{
		Id:   userEntity[0].ID,
		Name: userEntity[0].UserName,
	}

	c.JSON(http.StatusOK, user)
}
