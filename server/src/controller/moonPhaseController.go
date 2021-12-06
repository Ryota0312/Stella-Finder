package controller

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"
)

// {"date": {"day": "3", "month": "9", "year": "2021"}, "moon_age": 25.55, "version": "2.2"}
type MoonAgeOutputForm struct {
	MoonAge float64 `json:"moon_age"`
}

func GetMoonAge(c *gin.Context) {
	today := time.Now()
	response, _ := http.Get("https://labs.bitmeister.jp/ohakon/json/?mode=moon_age" +
		"&year=" + strconv.Itoa(today.Year()) +
		"&month=" + strconv.Itoa(int(today.Month())) +
		"&day=" + strconv.Itoa(today.Day()))
	responseBody, _ := ioutil.ReadAll(response.Body)

	var output MoonAgeOutputForm
	if err := json.Unmarshal(responseBody, &output); err != nil {
		c.JSON(http.StatusInternalServerError, "Internal server error")
		return
	}
	defer response.Body.Close()

	c.JSON(http.StatusOK, output)
}
