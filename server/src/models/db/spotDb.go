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
	spot.ID = id

	db := open()
	db.Model(&spot).Update("cover_image", coverImage)
	defer db.Close()
}

func CreateSpot(name string, place string, coverImage string) {
	var spot = entity.Spot{}
	spot.Name = name
	spot.Place = place
	spot.CoverImage = coverImage

	db := open()
	// select
	db.Create(&spot)
	defer db.Close()
}