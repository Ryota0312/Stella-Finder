package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func FindSpot(id int) entity.Spot {
	var spot = entity.Spot{}

	db := open()
	// select
	db.First(&spot, id)
	defer db.Close()

	return spot
}

func AllSpots() []entity.Spot {
	var spots []entity.Spot

	db := open()
	// select
	db.Find(&spots)
	defer db.Close()

	return spots
}

func UpdateSpot(id int, coverImage string, postalCode string, prefecture string, address string, remarks string, updatedBy int) {
	var spot = entity.Spot{}
	spot.ID = id

	db := open()
	db.Model(&spot).Updates(entity.Spot{
		CoverImage:    coverImage,
		PostalCode:    postalCode,
		Prefecture:    prefecture,
		Address:       address,
		Remarks:       remarks,
		LastUpdatedBy: updatedBy,
	})
	//.Update(
	//	"cover_image", coverImage,
	//	"postal_code", postalCode,
	//	"prefecture", prefecture,
	//	"address", address,
	//	"remarks", remarks,
	//	"last_updated_by", updatedBy)

	defer db.Close()
}

func CreateSpot(name string, coverImage string, postalCode string, prefecture string, address string, remarks string, updatedBy int) entity.Spot {
	var spot = entity.Spot{}
	spot.Name = name
	spot.CoverImage = coverImage
	spot.PostalCode = postalCode
	spot.Prefecture = prefecture
	spot.Address = address
	spot.Remarks = remarks
	spot.LastUpdatedBy = updatedBy

	db := open()
	// select
	db.Create(&spot)
	defer db.Close()

	return spot
}

func SpotNameExists(spotName string) bool {
	var spot []entity.Spot
	var count int

	db := open()
	db.Where("name = ?", spotName).Find(&spot).Count(&count)

	if count > 0 {
		return true
	}
	return false
}
