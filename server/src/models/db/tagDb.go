package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func CreateTag(name string) entity.Tag {
	var tag = entity.Tag{}
	tag.Name = name

	db := open()
	defer db.Close()
	db.Create(&tag)

	return tag
}

func TagExists(tagName string) bool {
	var tags []entity.Tag
	var count int

	db := open()
	db.Where("name = ?", tagName).Find(&tags).Count(&count)

	if count > 0 {
		return true
	}
	return false
}

func GetTagIdByTagName(tagName string) int {
	var tag entity.Tag

	db := open()
	defer db.Close()
	db.Where("name = ?", tagName).First(&tag)

	return tag.Id
}
