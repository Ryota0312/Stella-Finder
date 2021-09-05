package entity

import "time"

type TmpRegister struct {
	ID          int       `gorm:"primary_key;not null"       json:"id"`
	RegisterKey string    `gorm:"type:varchar(128);not null"  json:"register_key"`
	LoginName   string    `gorm:"primary_key;type:varchar(64);not null"  json:"login_name"`
	CreatedAt   time.Time `gorm:"type:datetime(3);not null"  json:"created_at"`
}
