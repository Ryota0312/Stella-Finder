package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func CreateSpotImage(spotId int, image string) {
	var spotImage = entity.SpotImage{}
	spotImage.SpotId = spotId
	spotImage.Image = image

	db := open()
	// select
	db.Create(&spotImage)
	defer db.Close()
}

type SpotImageWithCreatedBy struct {
	SpotId    int    `json:"spotId"`
	Image     string `json:"image"`
	CreatedBy int    `json:"createdBy"`
}

func GetAllSpotImages(spotId int) []SpotImageWithCreatedBy {
	var spotImage []SpotImageWithCreatedBy

	db := open()
	db.Table("spot_image").Select("spot_image.spot_id, spot_image.image, file.created_by").Joins("left join file on file.file_key = spot_image.image").Where("spot_id = ?", spotId).Scan(&spotImage)
	defer db.Close()

	return spotImage
}
