package entity

type Tag struct {
	Id   int    `gorm:"primary_key;type:int(11);not null"  json:"id"`
	Name string `gorm:"type:varchar(64);not null"  json:"name"`
}
