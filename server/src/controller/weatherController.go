package controller

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"stella-finder-server/src/models/db"
	"strconv"
)

type GetCurrentWeatherOutput struct {
	Weather []struct {
		Id          int    `json:"id"`
		Main        string `json:"main"`
		Description string `json:"description"`
		Icon        string `json:"icon"`
	} `json:"weather"`
	Clouds struct {
		All int `json:"all"`
	} `json:"clouds"`
}

func GetCurrentWeatherBySpotId(c *gin.Context) {
	spotId, _ := strconv.Atoi(c.Query("spotId"))

	spot := db.FindSpot(spotId)

	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Fatalf("error: %v", loadErr)
	}
	API_KEY := os.Getenv("OPENWEATHERMAP_API_KEY")

	var output GetCurrentWeatherOutput

	response, _ := http.Get("https://api.openweathermap.org/data/2.5/weather?" +
		"lat=" + strconv.FormatFloat(spot.Latitude, 'f', -1, 64) +
		"&lon=" + strconv.FormatFloat(spot.Longitude, 'f', -1, 64) +
		"&APPID=" + API_KEY)
	responseBody, _ := ioutil.ReadAll(response.Body)
	defer response.Body.Close()

	if err := json.Unmarshal(responseBody, &output); err != nil {
		c.JSON(http.StatusInternalServerError, "Internal server error")
		return
	}

	c.JSON(http.StatusOK, output)
}

type GetTonightWeatherBySpotIdOutput struct {
	Weathers [13]GetCurrentWeatherOutput
}

// 今日の18時〜翌日6時までの天気を返す
func GetTonightWeatherBySpotId(c *gin.Context) {
	spotId, _ := strconv.Atoi(c.Query("spotId"))

	spot := db.FindSpot(spotId)

	// TODO: ここでキャッシュDBに今日の18時〜翌日6時までの天気データ問い合わせ
	// １つでも欠けてればOneCall APIで取得・キャッシュDBに保存
	// キャッシュ有効期限は...

	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Fatalf("error: %v", loadErr)
	}
	API_KEY := os.Getenv("OPENWEATHERMAP_API_KEY")

	var output GetTonightWeatherBySpotIdOutput

	response, _ := http.Get("https://api.openweathermap.org/data/2.5/onecall?" +
		"lat=" + strconv.FormatFloat(spot.Latitude, 'f', -1, 64) +
		"&lon=" + strconv.FormatFloat(spot.Longitude, 'f', -1, 64) +
		"&exclude=current,minutely,daily,alerts" +
		"&APPID=" + API_KEY)
	responseBody, _ := ioutil.ReadAll(response.Body)
	defer response.Body.Close()

	// FIXME: responseBodyから18時~翌6時を抜き出して詰める＆キャッシュ
	//if err := json.Unmarshal(responseBody, &output); err != nil {
	//	c.JSON(http.StatusInternalServerError, "Internal server error")
	//	return
	//}

	c.JSON(http.StatusOK, output)
}
