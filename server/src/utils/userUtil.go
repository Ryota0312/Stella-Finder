package utils

import (
	"errors"
	"github.com/gin-contrib/sessions"
)

func GetLoginUserMailAddressFromSession(session sessions.Session) (string, error) {
	var loginUserMailAddress string
	v := session.Get("mailAddress")
	if v == nil {
		return "", errors.New("not login")
	} else {
		loginUserMailAddress = v.(string)
	}

	return loginUserMailAddress, nil
}
