package db

import (

	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func CreateTmpRegister(registerKey string, loginName string) {
	var tmpRegister = entity.TmpRegister{}
	tmpRegister.RegisterKey = registerKey
	tmpRegister.LoginName = loginName

	db := open()
	// select
	db.Create(&tmpRegister)
	defer db.Close()
}
