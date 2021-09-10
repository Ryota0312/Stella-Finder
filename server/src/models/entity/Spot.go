package entity

type Spot struct {
	ID         int    `gorm:"primary_key;not null"       json:"id"`
	Name       string `gorm:"type:varchar(64);not null"  json:"name"`
	Place      string `gorm:"type:varchar(128);not null"  json:"place"`
	CoverImage string `gorm:"type:varchar(64);"          json:"coverImage"`
}
