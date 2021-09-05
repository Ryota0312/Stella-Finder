package db

import (

	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
	"stella-finder-server/src/utils"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func CreateTmpUser(loginName string, mailAddress string) {
	var tmpUser = entity.User{}
	tmpUser.LoginName = loginName
	tmpUser.MailAddress = mailAddress
	tmpUser.IsTemporary = 1

	// 仮登録なのでユーザ名はランダムで生成されたログイン名と同一、パスワードはランダム生成
	tmpUser.UserName = loginName
	tmpUser.Password = utils.RandString(256)

	db := open()
	// select
	db.Create(&tmpUser)
	defer db.Close()
}

func UpdateTmpUser(mailAddress string, newLoginName string, userName string, password string) {
	var user = entity.User{}

	db := open()
	db.Model(&user).Where("mail_address = ?", mailAddress).Updates(entity.User{LoginName: newLoginName, UserName: userName, Password: password, IsTemporary: 0})
	defer db.Close()
}

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
