package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func SearchSpot(prefectures []string, name string, totalPoint int, darknessPoint int, viewPoint int, safetyPoint int, order string, ascDesc string, limit int) []entity.Spot {
	var spots []entity.Spot

	db := open()
	defer db.Close()

	if len(prefectures) > 0 {
		for _, prefecture := range prefectures {
			db = db.Or("prefecture = ?", prefecture)
		}
	}

	if name != "" {
		db = db.Where("name like ?", "%"+name+"%")
	}

	if totalPoint > 0 {
		db = db.Where("avg_total_point >= ?", totalPoint)
	}

	if darknessPoint > 0 {
		db = db.Where("avg_darkness_point >= ?", darknessPoint)
	}

	if viewPoint > 0 {
		db = db.Where("avg_view_point >= ?", viewPoint)
	}

	if safetyPoint > 0 {
		db = db.Where("avg_safety_point >= ?", safetyPoint)
	}

	if order != "" {
		db = db.Order(order + " " + ascDesc)
	}

	if limit > 0 {
		db.Limit(limit).Find(&spots)
	} else {
		db.Find(&spots)
	}

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

func UpdateSpot(id int, spotName string, coverImage string, postalCode string, prefecture string, address string, lat float64, lng float64, remarks string, updatedBy int) {
	var spot = entity.Spot{}
	spot.ID = id

	db := open()
	db.Model(&spot).Updates(entity.Spot{
		Name:          spotName,
		CoverImage:    coverImage,
		PostalCode:    postalCode,
		Prefecture:    prefecture,
		Address:       address,
		Latitude:      lat,
		Longitude:     lng,
		Remarks:       remarks,
		LastUpdatedBy: updatedBy,
	})

	defer db.Close()
}

func CreateSpot(name string, coverImage string, postalCode string, prefecture string, address string, lat float64, lng float64, remarks string, updatedBy int) entity.Spot {
	var spot = entity.Spot{}
	spot.Name = name
	spot.CoverImage = coverImage
	spot.PostalCode = postalCode
	spot.Prefecture = prefecture
	spot.Address = address
	spot.Latitude = lat
	spot.Longitude = lng
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
