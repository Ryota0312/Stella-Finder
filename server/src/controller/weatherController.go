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
