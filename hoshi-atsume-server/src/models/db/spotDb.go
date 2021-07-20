package db

import (
	// フォーマットI/O
	"fmt"

	// Go言語のORM
	"github.com/jinzhu/gorm"

	// エンティティ(データベースのテーブルの行に対応)
	entity "hoshi-atsume-server/src/models/entity"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// DB接続する
func open() *gorm.DB {
	DBMS := "mysql"
	USER := "root"
	PASS := "root"
	PROTOCOL := "tcp(hoshi-atsume-db:3306)"
	DBNAME := "sample"
	CONNECT := USER + ":" + PASS + "@" + PROTOCOL + "/" + DBNAME
	db, err := gorm.Open(DBMS, CONNECT)

	if err != nil {
		panic(err.Error())
	}

	// DBエンジンを「InnoDB」に設定
	db.Set("gorm:table_options", "ENGINE=InnoDB")

	// 詳細なログを表示
	db.LogMode(true)

	// 登録するテーブル名を単数形にする（デフォルトは複数形）
	db.SingularTable(true)

	// マイグレーション（テーブルが無い時は自動生成）
	db.AutoMigrate(&entity.Spot{})

	fmt.Println("db connected: ", &db)
	return db
}

func FindSpot(id int) []entity.Spot {
	spot := []entity.Spot{}

	db := open()
	// select
	db.First(&spot, id)
	defer db.Close()

	return spot
}
