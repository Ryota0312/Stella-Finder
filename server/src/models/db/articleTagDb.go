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

func GetArticleTags() []entity.Tag {
	var tags []entity.Tag

	db := open()
	defer db.Close()

	db.Table("tag").Select("DISTINCT tag.id, tag.name").Joins("left join article_tag on article_tag.tag_id = tag.id").Where("article_id IS NOT NULL").Find(&tags)
	return tags
}
