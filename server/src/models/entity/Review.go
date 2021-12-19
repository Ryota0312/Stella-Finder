package entity

import (
	"time"
)

type Review struct {
	Id        int       `gorm:"primary_key;not null"  json:"id"`
	SpotId    int       `gorm:"type:int(11);not null"  json:"spotId"`
	Darkness  int       `gorm:"type:tinyint;not null"  json:"darkness"`
	View      int       `gorm:"type:tinyint;not null"  json:"view"`
	Safety    int       `gorm:"type:tinyint;not null"  json:"safety"`
	Comment   string    `gorm:"type:text;"  json:"comment"`
	CreatedBy int       `gorm:"type:int(11);not null"  json:"createdBy"`
	CreatedAt time.Time `gorm:"type:datetime(3);not null;default:current_timestamp"  json:"createdAt"`
	LikeCount int       `gorm:"type:int(11);not null;default:0" json:"likeCount"`
}
