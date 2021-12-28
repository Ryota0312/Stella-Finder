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

func FindAllArticle(limit int) []entity.Article {
	var articles []entity.Article

	db := open()
	if limit > 0 {
		db.Order("created_at desc").Limit(limit).Find(&articles)
	} else {
		db.Order("created_at desc").Find(&articles)
	}
	defer db.Close()

	return articles
}

func FindArticleById(articleId int) entity.Article {
	var article entity.Article

	db := open()
	db.Where("id = ?", articleId).Find(&article)
	defer db.Close()

	return article
}

func FindArticleByTag(tagId int) []entity.Article {
	var articles []entity.Article

	db := open()
	defer db.Close()

	db.Table("article").Joins("left join article_tag on article_tag.article_id = article.id").Where("tag_id = ?", tagId).Order("article.created_at desc").Find(&articles)

	return articles
}

func UpdateArticle(articleId int, title string, body string) entity.Article {
	var article entity.Article
	article.ID = articleId

	db := open()
	defer db.Close()

	db.Model(&article).Updates(entity.Article{Title: title, Body: body})

	return article
}

func DeleteArticle(articleId int) {
	var article entity.Article
	article.ID = articleId

	var articleTag entity.ArticleTag
	articleTag.ArticleId = articleId

	println(articleId)

	db := open()
	defer db.Close()

	db.Delete(&articleTag)
	db.Delete(&article)
}
