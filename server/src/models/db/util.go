package db

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
	"log"
	"os"
	"stella-finder-server/src/models/entity"
)

// DB接続する
func open() *gorm.DB {
	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Fatalf("error: %v", loadErr)
	}

	// .envから環境変数読み込み
	MYSQL_ROOT_PASS := os.Getenv("MYSQL_ROOT_PASS")

	DBMS := "mysql"
	USER := "root"
	PASS := MYSQL_ROOT_PASS
	PROTOCOL := "tcp(stella-finder-db:3306)"
	DBNAME := "stella_finder"
	PARAMS := "parseTime=true"
	CONNECT := USER + ":" + PASS + "@" + PROTOCOL + "/" + DBNAME + "?" + PARAMS
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
	db.AutoMigrate(&entity.User{})
	db.AutoMigrate(&entity.Spot{})
	db.AutoMigrate(&entity.File{})
	db.AutoMigrate(&entity.TmpRegister{})

	fmt.Println("db connected: ", &db)
	return db
}
