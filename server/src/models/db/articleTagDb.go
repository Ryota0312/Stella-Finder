package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func CreateArticleTag(articleId int, tagId int) {
	var articleTag = entity.ArticleTag{}
	articleTag.ArticleId = articleId
	articleTag.TagId = tagId

	db := open()
	defer db.Close()

	db.Create(&articleTag)
}
