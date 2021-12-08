package db

import (

	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func CreateFile(fileKey string, fileName string, createdBy int) {
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

func GetFilesByUserId(userId int) []entity.File {
	var files []entity.File

	db := open()
	db.Where("created_by = ?", userId).Find(&files)
	defer db.Close()

	return files
}

//func DeleteFile(fileKey string, userMailAddress string) {
//	db := open()
//	db.Where().Delete()
//	defer db.Close()
//}
