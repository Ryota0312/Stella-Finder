package entity

type ReviewImage struct {
	ReviewId int    `gorm:"primary_key;type:int(11);not null"  json:"reviewId"`
	Image    string `gorm:"primary_key;type:varchar(64);not null"  json:"image"`
}
