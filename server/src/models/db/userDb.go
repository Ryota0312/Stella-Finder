package db

import (

	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
	"stella-finder-server/src/utils"
	"strconv"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func CreateTmpUser(mailAddress string) {
	// TODO: boolポインタやめたい
	ptrue := &[]bool{true}[0]

	var tmpUser = entity.User{}
	tmpUser.MailAddress = mailAddress
	tmpUser.IsTemporary = ptrue

	// 仮登録なのでパスワードはランダム生成
	tmpUser.Password = utils.RandString(256)

	db := open()
	// select
	db.Create(&tmpUser)
	defer db.Close()
}

func UpdateTmpUser(mailAddress string, userName string, password string) {
	// TODO: boolポインタやめたい
	pfalse := &[]bool{false}[0]
	var user = entity.User{}

	db := open()
	db.Model(&user).Where("mail_address = ?", mailAddress).Updates(entity.User{UserName: userName, Password: password, IsTemporary: pfalse})
	defer db.Close()
}

func FindUserByMailAddress(mailAddress string) []entity.User {
	var user []entity.User

	db := open()
	// select
	db.First(&user, `mail_address = "`+mailAddress+`"`)
	defer db.Close()

	return user
}

func FindUserById(id int) entity.User {
	var user = entity.User{}

	db := open()
	// select
	db.First(&user, `id = "`+strconv.Itoa(id)+`" AND is_temporary = 0`)
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
