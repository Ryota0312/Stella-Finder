package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func CreateArticle(title string, body string, createdBy int) entity.Article {
	var article = entity.Article{}
	article.Title = title
	article.Body = body
	article.CreatedBy = createdBy

	db := open()
	// select
	db.Create(&article)
	defer db.Close()

	return article
}
