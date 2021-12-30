package entity

import "time"

type Report struct {
	ID         int       `gorm:"primary_key;not null"       json:"id"`
	SpotId     int       `gorm:"type:int(11);not null" json:"spotId"`
	Title      string    `gorm:"type:varchar(128);not null"  json:"title"`
	Body       string    `gorm:"type:longtext;not null"  json:"body"`
	CoverImage string    `gorm:"type:varchar(64)" json:"coverImage"`
	CreatedAt  time.Time `gorm:"type:datetime(3);not null;default:current_timestamp"  json:"createdAt"`
	CreatedBy  int       `gorm:"type:int;"  json:"createdBy"`
	LikeCount  int       `gorm:"type:int(11);not null;default:0" json:"likeCount"`
}
