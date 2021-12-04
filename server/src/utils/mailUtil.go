package utils

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"log"
	"os"
)

func SendTmpRegisterMail(toMailAddress string, registerKey string) {
	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Fatalf("error: %v", loadErr)
	}

	// .envから環境変数読み込み
	API_KEY := os.Getenv("API_KEY")
	FROM := os.Getenv("FROM")
	DOMAIN := os.Getenv("DOMAIN")

	// メッセージの構築
	message := mail.NewV3Mail()
	// 送信元を設定
	from := mail.NewEmail("", FROM)
	message.SetFrom(from)

	// 1つ目の宛先と、対応するSubstitutionタグを指定
	p := mail.NewPersonalization()
	to := mail.NewEmail("", toMailAddress)
	p.AddTos(to)
	p.SetSubstitution("%registerKey%", registerKey)
	message.AddPersonalizations(p)

	// 件名を設定
	message.Subject = "Stella-Finder 仮登録完了のお知らせ"
	// テキストパートを設定
	c := mail.NewContent("text/plain", "Stella Finder にご登録いただきありがとうございます。\r\n\r\n"+
		"仮登録が完了しましたので、以下のURLから本登録を行ってください。\r\n"+
		"https://"+DOMAIN+"/register?registerKey=%registerKey%\r\n(有効期限は24時間です)")
	message.AddContent(c)

	// メール送信を行い、レスポンスを表示
	client := sendgrid.NewSendClient(API_KEY)
	response, err := client.Send(message)
	if err != nil {
		log.Println(err)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
}
