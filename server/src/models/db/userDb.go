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

func FindUserByMailAddress(mailAddress string) (entity.User, error) {
	var user = entity.User{}

	db := open()
	// select
	err := db.First(&user, `mail_address = "`+mailAddress+`"`)
	defer db.Close()

	if err != nil {
		return user, err.Error
	}

	return user, nil
}

func FindUserById(id int) entity.User {
	var user = entity.User{}

	db := open()
	// select
	db.First(&user, `id = "`+strconv.Itoa(id)+`" AND is_temporary = 0`)
	defer db.Close()

	return user
}

func UpdateUser(id int, userName string, description string) {
	var user = entity.User{}
	user.ID = id

	db := open()
	db.Model(&user).Update("user_name", userName).Update("description", description)
	defer db.Close()
}

func UpdateUserIcon(id int, icon string) {
	var user = entity.User{}
	user.ID = id

	db := open()
	db.Model(&user).Update("icon", icon)
	defer db.Close()
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

func DeleteTemporaryUser(mailAddress string) {
	db := open()
	db.Where("mail_address = ?", mailAddress).Where("is_temporary = ?", 1).Delete(entity.User{})
	defer db.Close()
}

func CreateUserWithSNSLogin(userName string, userId string, sns string) {
	ptrue := &[]bool{true}[0]
	pfalse := &[]bool{false}[0]

	var user = entity.User{}
	user.UserName = userName
	user.MailAddress = userId + "@" + sns
	user.IsSnsLogin = ptrue
	user.IsTemporary = pfalse

	// FIXME: SNSログインなのでパスワードは不要だが適当な値を入れている。テーブル定義を見直したほうがいい。
	user.Password = utils.RandString(256)

	db := open()
	db.Create(&user)
	defer db.Close()
}
