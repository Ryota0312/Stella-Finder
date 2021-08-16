package entity

import (
	"time"
)

type File struct {
	FileKey   string    `gorm:"primary_key;type:varchar(64);not null"  json:"fileKey"`
	FileName  string    `gorm:"type:varchar(256);not null"  json:"fileName"`
	CreatedBy string    `gorm:"type:varchar(64);not null"  json:"createdBy"`
	CreatedAt time.Time `gorm:"type:datetime(3);not null"  json:"createdAt"`
}
