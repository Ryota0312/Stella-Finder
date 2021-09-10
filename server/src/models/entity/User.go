package entity

type User struct {
	ID          int    `gorm:"primary_key;not null"       json:"id"`
	UserName    string `gorm:"type:varchar(64);not null"  json:"user_name"`
	MailAddress string `gorm:"type:varchar(128);not null"  json:"mail_address"`
	Password    string `gorm:"type:varchar(256);not null"  json:"password"`
	IsTemporary *bool  `json:"is_temporary"`
}
