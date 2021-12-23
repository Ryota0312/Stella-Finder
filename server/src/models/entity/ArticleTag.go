package entity

type ArticleTag struct {
	ArticleId int `gorm:"primary_key;type:int(11);not null"  json:"articleId"`
	TagId     int `gorm:"primary_key;type:int(11);not null"  json:"tagId"`
}
