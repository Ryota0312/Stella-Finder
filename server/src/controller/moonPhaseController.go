package controller

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"stella-finder-server/src/utils"
	"strconv"
	"time"
)

type MoonAgeOutputForm struct {
	MoonAge float64 `json:"moon_age"`
}

func GetMoonAge(c *gin.Context) {
	cacheDb := utils.NewCacheDb()
	defer cacheDb.CloseCacheDb()

	today := time.Now()
	const layout = "2006-01-02"
	todayString := today.Format(layout)

	var output MoonAgeOutputForm

	cache, err := cacheDb.Get(todayString)
	if cache == nil {
		response, _ := http.Get("https://labs.bitmeister.jp/ohakon/json/?mode=moon_age" +
			"&year=" + strconv.Itoa(today.Year()) +
			"&month=" + strconv.Itoa(int(today.Month())) +
			"&day=" + strconv.Itoa(today.Day()))
		responseBody, _ := ioutil.ReadAll(response.Body)
		defer response.Body.Close()

		if err := json.Unmarshal(responseBody, &output); err != nil {
			c.JSON(http.StatusInternalServerError, "Internal server error")
			return
		}

		err = cacheDb.Set(todayString, responseBody, 60*60*24)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Cache error")
			return
		}

	} else {
		err = json.Unmarshal(cache, &output)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Cache error")
			return
		}
	}

	c.JSON(http.StatusOK, output)
}
