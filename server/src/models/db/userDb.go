package db

import (

	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func FindUser(loginName string) []entity.User {
	var user []entity.User

	db := open()
	// select
	db.First(&user, `login_name = "`+loginName+`"`)
	defer db.Close()

	return user
}

func MailAddressExists(mailAddress string) bool {
	var user []entity.User
	var count int

	db := open()
	db.Where("mail_address = ?", mailAddress).Find(&user).Count(&count)

	if count > 0 {
		return true
	}
	return false
}
