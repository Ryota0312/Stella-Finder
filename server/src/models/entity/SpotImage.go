package entity

type SpotImage struct {
	SpotId int    `gorm:"primary_key;type:int(11);not null"  json:"spotId"`
	Image  string `gorm:"primary_key;type:varchar(64);not null"  json:"image"`
}
