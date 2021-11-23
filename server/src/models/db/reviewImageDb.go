package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func CreateReviewImages(reviewId int, images []string) {
	db := open()

	for _, image := range images {
		var reviewImage = entity.ReviewImage{}
		reviewImage.ReviewId = reviewId
		reviewImage.Image = image

		db.Create(&reviewImage)
	}

	defer db.Close()
}
