package db

import (

	// エンティティ(データベースのテーブルの行に対応)
	entity "hoshi-atsume-server/src/models/entity"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func FindUser(loginName string, password string) []entity.User {
	user := []entity.User{}

	db := open()
	// select
	db.First(&user, `login_name = "` + loginName + `"`)
	defer db.Close()

	return user
}
