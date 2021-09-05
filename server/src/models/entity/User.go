package entity

type User struct {
	ID          int    `gorm:"primary_key;not null"       json:"id"`
	UserName    string `gorm:"type:varchar(64);not null"  json:"user_name"`
	MailAddress string `gorm:"type:varchar(128);not null"  json:"mail_address"`
	LoginName   string `gorm:"type:varchar(64);not null"  json:"login_name"`
	Password    string `gorm:"type:varchar(256);not null"  json:"password"`
	IsTemporary int    `gorm:"type:tinyint(1);not null"  json:"is_temporary"`
}
