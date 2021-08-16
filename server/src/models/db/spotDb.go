package db

import (

	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func FindSpot(id int) []entity.Spot {
	var spot []entity.Spot

	db := open()
	// select
	db.First(&spot, id)
	defer db.Close()

	return spot
}

func AllSpots() []entity.Spot {
	var spots []entity.Spot

	db := open()
	// select
	db.Find(&spots)
	defer db.Close()

	return spots
}
