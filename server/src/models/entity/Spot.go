package entity

import "time"

type Spot struct {
	ID               int       `gorm:"primary_key;not null"       json:"id"`
	Name             string    `gorm:"type:varchar(64);not null"  json:"name"`
	CoverImage       string    `gorm:"type:varchar(64);"          json:"coverImage"`
	PostalCode       string    `gorm:"type:varchar(8);"  json:"postalCode"`
	Prefecture       string    `gorm:"type:varchar(32);not null"  json:"prefecture"`
	Address          string    `gorm:"type:varchar(256);not null"  json:"address"`
	Latitude         float64   `gorm:"type:double;" json:"latitude"`
	Longitude        float64   `gorm:"type:double;" json:"longitude"`
	Remarks          string    `gorm:"type:text;"  json:"remarks"`
	LastUpdatedAt    time.Time `gorm:"type:datetime(3);not null;default:current_timestamp"  json:"updatedAt"`
	LastUpdatedBy    int       `gorm:"type:int;"  json:"updatedBy"`
	AvgTotalPoint    float64   `gorm:"type:double;not null;default:0"  json:"avgTotalPoint"`
	AvgDarknessPoint float64   `gorm:"type:double;not null;default:0"  json:"avgDarknessPoint"`
	AvgViewPoint     float64   `gorm:"type:double;not null;default:0"  json:"avgViewPoint"`
	AvgSafetyPoint   float64   `gorm:"type:double;not null;default:0"  json:"avgSafetyPoint"`
	ReviewCount      int       `gorm:"type:int;not null;default:0" json:"reviewCount"`
}
