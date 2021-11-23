package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func CreateReview(spoId int, darkness int, view int, safety int, comment string, createdBy int) entity.Review {
	var review = entity.Review{}
	review.SpotId = spoId
	review.Darkness = darkness
	review.View = view
	review.Safety = safety
	review.Comment = comment
	review.CreatedBy = createdBy

	db := open()
	// select
	db.Create(&review)
	defer db.Close()

	return review
}
