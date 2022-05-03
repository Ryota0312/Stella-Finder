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
	"stella-finder-server/src/utils"
	"strconv"
	"time"
)

type Weather struct {
	Id          int    `json:"id"`
	Main        string `json:"main"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
}

type GetCurrentWeatherOutput struct {
	Weathers []Weather `json:"weather"`
	Clouds   struct {
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

type OneCallApiResponse struct {
	HourlyWeather []struct {
		Dt         int       `json:"dt"`
		Clouds     int       `json:"clouds"`
		Visibility int       `json:"visibility"`
		Weathers   []Weather `json:"weather"`
	} `json:"hourly"`
}

type GetTonightWeatherBySpotIdOutput struct {
	Weathers [13]struct {
		Hour    int
		Weather Weather
	}
}

// 今日の18時〜翌日6時までの天気を返す
func GetTonightWeatherBySpotId(c *gin.Context) {
	spotId, _ := strconv.Atoi(c.Query("spotId"))

	spot := db.FindSpot(spotId)

	cacheDb := utils.NewCacheDb()
	defer cacheDb.CloseCacheDb()

	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		panic(err)
	}
	time.Local = jst

	today := time.Now()
	const layout = "2006-01-02"
	todayString := today.Format(layout)
	cacheKey := todayString + "-tonight-weather-" + string(rune(spotId))

	var output GetTonightWeatherBySpotIdOutput

	cache, err := cacheDb.Get(cacheKey)
	if cache == nil {
		loadErr := godotenv.Load()
		if loadErr != nil {
			log.Fatalf("error: %v", loadErr)
		}
		API_KEY := os.Getenv("OPENWEATHERMAP_API_KEY")

		response, _ := http.Get("https://api.openweathermap.org/data/2.5/onecall?" +
			"lat=" + strconv.FormatFloat(spot.Latitude, 'f', -1, 64) +
			"&lon=" + strconv.FormatFloat(spot.Longitude, 'f', -1, 64) +
			"&exclude=current,minutely,daily,alerts" +
			"&APPID=" + API_KEY)
		responseBody, _ := ioutil.ReadAll(response.Body)
		defer response.Body.Close()

		var oneCallApiResponse OneCallApiResponse
		if err := json.Unmarshal(responseBody, &oneCallApiResponse); err != nil {
			c.JSON(http.StatusInternalServerError, "Internal server error")
			return
		}

		output = getTonightForecastAfterNow(oneCallApiResponse)

		jsonData, err := json.Marshal(output)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Internal server error")
			return
		}

		cacheDb.Set(cacheKey, jsonData, 60*60*1)
	} else {
		if err := json.Unmarshal(cache, &output); err != nil {
			c.JSON(http.StatusInternalServerError, "Internal server error")
			return
		}
	}

	c.JSON(http.StatusOK, output)
}

// 18時~6時の天気を取得する
// 06:01 ~ 23:59: N日18:00~23:00まで & N+1日00:00~06:00
// 00:00 ~ 06:00: N日~06:00
func getTonightForecastAfterNow(oneCallApiResponse OneCallApiResponse) GetTonightWeatherBySpotIdOutput {
	var output GetTonightWeatherBySpotIdOutput

	hourlyWeather := oneCallApiResponse.HourlyWeather
	nowHour := time.Now().Hour()
	if nowHour >= 0 && nowHour <= 6 {
		firstHour := time.Unix(int64(hourlyWeather[0].Dt), 0).Hour()
		for i, _ := range make([]int, 7-firstHour) {
			output.Weathers[13-(6-firstHour+i)].Hour = (firstHour + i) % 24
			output.Weathers[13-(6-firstHour+i)].Weather = hourlyWeather[i].Weathers[0]
		}
	} else if nowHour >= 18 && nowHour <= 23 {
		firstHour := time.Unix(int64(hourlyWeather[0].Dt), 0).Hour()
		for i, _ := range make([]int, 24-firstHour+7) {
			output.Weathers[(firstHour+i)-18].Hour = (firstHour + i) % 24
			output.Weathers[(firstHour+i)-18].Weather = hourlyWeather[i].Weathers[0]
		}
	}

	return output
}
