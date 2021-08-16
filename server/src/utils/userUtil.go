package utils

import (
	"errors"
	"github.com/gin-contrib/sessions"
)

func GetLoginUserFromSession(session sessions.Session) (string, error) {
	var loginUser string
	v := session.Get("loginName")
	if v == nil {
		return "Guest", errors.New("not login")
	} else {
		loginUser = v.(string)
	}

	return loginUser, nil
}
