package db

import (

	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"

	_ "github.com/jinzhu/gorm/dialects/mysql"
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
	var tmpRegisters entity.TmpRegister

	db := open()
	// select
	db.First(&tmpRegisters, `register_key = "`+registerKey+`"`)
	defer db.Close()

	return tmpRegisters
}
