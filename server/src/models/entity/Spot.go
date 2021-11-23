package entity

import "time"

type Spot struct {
	ID            int       `gorm:"primary_key;not null"       json:"id"`
	Name          string    `gorm:"type:varchar(64);not null"  json:"name"`
	CoverImage    string    `gorm:"type:varchar(64);"          json:"coverImage"`
	Place         string    `gorm:"type:varchar(128);not null"  json:"place"`
	PostalCode    string    `gorm:"type:varchar(8);"  json:"postalCode"`
	Prefecture    string    `gorm:"type:varchar(32);not null"  json:"prefecture"`
	Address       string    `gorm:"type:varchar(256);not null"  json:"address"`
	Remarks       string    `gorm:"type:text;"  json:"remarks"`
	LastUpdatedAt time.Time `gorm:"type:datetime(3);not null;default:current_timestamp"  json:"updatedAt"`
	LastUpdatedBy int       `gorm:"type:int;"  json:"updatedBy"`
}
