package entity

type User struct {
	UserName    string `gorm:"type:varchar(64);not null"  json:"user_name"`
	MailAddress string `gorm:"type:varchar(128);not null"  json:"mail_address"`
	LoginName   string `gorm:"primary_key;type:varchar(64);not null"  json:"login_name"`
	Password    string `gorm:"type:varchar(256);not null"  json:"password"`
	IsTemporary bool   `gorm:"type:tinyint(1)"  json:"is_temporary"`
}
