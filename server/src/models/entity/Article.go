package entity

import "time"

type Article struct {
	ID         int       `gorm:"primary_key;not null"       json:"id"`
	Title      string    `gorm:"type:varchar(128);not null"  json:"title"`
	Body       string    `gorm:"type:longtext;not null"  json:"body"`
	CoverImage string    `gorm:"type:varchar(64)" json:"coverImage"`
	CreatedAt  time.Time `gorm:"type:datetime(3);not null;default:current_timestamp"  json:"createdAt"`
	CreatedBy  int       `gorm:"type:int;"  json:"createdBy"`
}
