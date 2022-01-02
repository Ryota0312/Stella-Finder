package db

import (
	"errors"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func CreateReport(spotId int, title string, body string, coverImage string, createdBy int) entity.Report {
	var report = entity.Report{}
	report.SpotId = spotId
	report.Title = title
	report.Body = body
	report.CoverImage = coverImage
	report.CreatedBy = createdBy

	db := open()
	defer db.Close()
	db.Create(&report)

	return report
}

func FindAllReport(limit int) []entity.Report {
	var reports []entity.Report

	db := open()
	defer db.Close()

	if limit > 0 {
		db.Order("created_at desc").Limit(limit).Find(&reports)
	} else {
		db.Order("created_at desc").Find(&reports)
	}

	return reports
}

func FindReportById(reportId int) entity.Report {
	var report entity.Report

	db := open()
	db.Where("id = ?", reportId).Find(&report)
	defer db.Close()

	return report
}

func FindReportsBySpotId(spotId int, limit int) []entity.Report {
	var reports []entity.Report

	db := open()
	defer db.Close()

	if limit > 0 {
		db.Where("spot_id = ?", spotId).Order("created_at desc").Limit(limit).Find(&reports)
	} else {
		db.Where("spot_id = ?", spotId).Order("created_at desc").Find(&reports)
	}

	return reports
}

func UpdateReport(reportId int, loginUserId int, title string, body string, coverImage string) (entity.Report, error) {
	var report entity.Report

	db := open()
	defer db.Close()

	db.Where("id = ?", reportId).Find(&report)
	if report.CreatedBy != loginUserId {
		return report, errors.New("作成者以外は編集できません")
	}
	db.Model(&report).Updates(entity.Report{Title: title, Body: body, CoverImage: coverImage})

	return report, nil
}

func DeleteReport(reportId int, loginUserId int) error {
	var report entity.Report

	db := open()
	defer db.Close()

	db.Where("id = ?", reportId).Find(&report)
	if report.CreatedBy != loginUserId {
		return errors.New("作成者以外は削除できません")
	}

	db.Delete(&report)
	return nil
}

func IncrementReportLikeCount(reportId int) {
	var report = entity.Report{}
	report.ID = reportId

	db := open()
	defer db.Close()
	db.Model(&report).Update("like_count", gorm.Expr("like_count + 1"))
}
