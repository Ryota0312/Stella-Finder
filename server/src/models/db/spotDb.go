package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func FindSpot(id int) entity.Spot {
	var spot = entity.Spot{}

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

func UpdateSpot(id int, coverImage string) {
	var spot = entity.Spot{}

	db := open()
	db.First(&spot, id)
	spot.CoverImage = coverImage
	db.Save(&spot)
	defer db.Close()
}
