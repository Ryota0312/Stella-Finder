package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func CreateTmpRegister(registerKey string, mailAddress string) {
	var tmpRegister = entity.TmpRegister{}
	tmpRegister.RegisterKey = registerKey
	tmpRegister.MailAddress = mailAddress

	db := open()
	// select
	db.Create(&tmpRegister)
	defer db.Close()
}

func FindTmpRegister(registerKey string) entity.TmpRegister {
	var tmpRegister entity.TmpRegister

	db := open()
	// select
	db.First(&tmpRegister, `register_key = "`+registerKey+`"`)
	defer db.Close()

	return tmpRegister
}

func DeleteTmpRegister(registerKey string) {
	var tmpRegister = entity.TmpRegister{}
	tmpRegister.RegisterKey = registerKey

	db := open()
	db.Delete(&tmpRegister)
	defer db.Close()
}