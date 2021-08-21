package db

import (

	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func CreateFile(fileKey string, fileName string, createdBy string) {
	var file = entity.File{}
	file.FileKey = fileKey
	file.FileName = fileName
	file.CreatedBy = createdBy

	db := open()
	// select
	db.Create(&file)
	defer db.Close()
}

func GetFile(fileKey string) entity.File {
	var file = entity.File{}

	db := open()
	db.First(&file, fileKey)
	defer db.Close()

	return file
}
