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

func GetFileInfo(fileKey string) entity.File {
	var fileInfo = entity.File{}

	db := open()
	db.First(&fileInfo, fileKey)
	defer db.Close()

	return fileInfo
}

func GetFilesByUserId(mailAddress string) []entity.File {
	var files []entity.File

	db := open()
	db.Where("created_by = ?", mailAddress).Find(&files)
	defer db.Close()

	return files
}
