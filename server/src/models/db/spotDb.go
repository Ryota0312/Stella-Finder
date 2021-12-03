package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func AllSpots() []entity.Spot {
	var spots []entity.Spot

	db := open()
	// select
	db.Find(&spots)
	defer db.Close()

	return spots
}

func AllSpotsOrderBy(order string, ascDesc string) []entity.Spot {
	var spots []entity.Spot

	db := open()
	// select
	db.Order(order + " " + ascDesc).Find(&spots)
	defer db.Close()

	return spots
}

func FindSpot(id int) entity.Spot {
	var spot = entity.Spot{}

	db := open()
	// select
	db.First(&spot, id)
	defer db.Close()

	return spot
}

func FindSpotByPrefecture(prefectures []string) []entity.Spot {
	var spots []entity.Spot

	db := open()
	for _, prefecture := range prefectures {
		db = db.Or("prefecture = ?", prefecture)
	}
	db.Find(&spots)
	defer db.Close()

	return spots
}

func FindSpotByPrefectureOrderBy(prefectures []string, order string, ascDesc string) []entity.Spot {
	var spots []entity.Spot

	db := open()
	for _, prefecture := range prefectures {
		db = db.Or("prefecture = ?", prefecture)
	}
	db.Order(order + " " + ascDesc).Find(&spots)
	defer db.Close()

	return spots
}

func UpdateSpot(id int, spotName string, coverImage string, postalCode string, prefecture string, address string, remarks string, updatedBy int) {
	var spot = entity.Spot{}
	spot.ID = id

	db := open()
	db.Model(&spot).Updates(entity.Spot{
		Name:          spotName,
		CoverImage:    coverImage,
		PostalCode:    postalCode,
		Prefecture:    prefecture,
		Address:       address,
		Remarks:       remarks,
		LastUpdatedBy: updatedBy,
	})

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

func SpotNameExistsExcludeId(spotId int, spotName string) bool {
	var spot []entity.Spot
	var count int

	db := open()
	db.Where("id <> ?", spotId).Where("name = ?", spotName).Find(&spot).Count(&count)

	if count > 0 {
		return true
	}
	return false
}

func UpdateReviewPoint(spotId int, total float64, darkness float64, view float64, safety float64, reviewCount int) {
	var spot = entity.Spot{}
	spot.ID = spotId

	db := open()
	db.Model(&spot).Updates(entity.Spot{
		AvgTotalPoint:    total,
		AvgDarknessPoint: darkness,
		AvgViewPoint:     view,
		AvgSafetyPoint:   safety,
		ReviewCount:      reviewCount,
	})

	defer db.Close()
}
