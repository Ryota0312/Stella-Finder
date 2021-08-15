package db

import (

	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func FindSpot(id int) []entity.Spot {
	spot := []entity.Spot{}

	db := open()
	// select
	db.First(&spot, id)
	defer db.Close()

	return spot
}
