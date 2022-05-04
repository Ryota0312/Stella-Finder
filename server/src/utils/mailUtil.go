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
	message.Subject = "Stella Finder仮登録完了のお知らせ"
	// テキストパートを設定
	c := mail.NewContent("text/plain", "この度はStella Finderをご利用いただき、誠にありがとうございます。\r\n"+
		"下記の本登録用URLから、ご登録手続きをお願いいたします。\r\n\r\n"+
		"https://"+DOMAIN+"/register?registerKey=%registerKey%\r\n\r\n"+
		"※ご注意\r\n"+
		"本登録URLの有効期限は24時間です。24時間以内にご登録手続きを完了してください。\r\n")
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

func SendContactMail(fromMailAddress string, body string) error {
	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Fatalf("error: %v", loadErr)
	}

	// .envから環境変数読み込み
	API_KEY := os.Getenv("API_KEY")
	FROM := os.Getenv("FROM")
	CONTACT_TO := os.Getenv("CONTACT_TO")

	// メッセージの構築
	message := mail.NewV3Mail()
	// 送信元を設定
	from := mail.NewEmail("", FROM)
	message.SetFrom(from)

	// 1つ目の宛先と、対応するSubstitutionタグを指定
	p := mail.NewPersonalization()
	to := mail.NewEmail("", CONTACT_TO)
	p.AddTos(to)
	message.AddPersonalizations(p)

	// 件名を設定
	message.Subject = "【Stella Finder】お問い合わせです"
	// テキストパートを設定
	c := mail.NewContent("text/plain", "FROM: "+fromMailAddress+"\r\n"+
		"本文: "+body+"\r\n")
	message.AddContent(c)

	// メール送信を行い、レスポンスを表示
	client := sendgrid.NewSendClient(API_KEY)
	response, err := client.Send(message)
	if err != nil {
		log.Println(err)
		return err
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
		return nil
	}

	return nil
}

func SendChangePasswordMail(toMailAddress string, resetCode string) {
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
	p.SetSubstitution("%resetCode%", resetCode)
	message.AddPersonalizations(p)

	// 件名を設定
	message.Subject = "【Stella Finder】パスワード再設定のご案内"
	// テキストパートを設定
	c := mail.NewContent("text/plain", "Stella Finderのパスワード再設定のご案内です。\r\n"+
		"下記のパスワード再設定用URLから、手続きをお願いいたします。\r\n\r\n"+
		"https://"+DOMAIN+"/changePassword?resetCode=%resetCode%\r\n\r\n"+
		"※ご注意\r\n"+
		"URLの有効期限は10分です。10分以内に手続きを完了してください。有効期限切れの場合はお手数ですがパスワード再設定ページから再度お手続きください。\r\n")
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
