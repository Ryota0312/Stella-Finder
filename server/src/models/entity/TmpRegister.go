package entity

import "time"

type TmpRegister struct {
	ID          int       `gorm:"primary_key;not null"       json:"id"`
	RegisterKey string    `gorm:"type:varchar(128);not null"  json:"register_key"`
	MailAddress string    `gorm:"primary_key;type:varchar(128);not null"  json:"mail_address"`
	CreatedAt   time.Time `gorm:"type:datetime(3);not null"  json:"created_at"`
}
