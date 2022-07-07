package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"stella-finder-server/src/utils"
	"strconv"
	"time"
)

type MoonAgeOutputForm struct {
	MoonAge float64 `json:"moon_age"`
}

func GetMoonAge(c *gin.Context) {
	var output MoonAgeOutputForm

	today := time.Now()
	moonInfo, err := utils.GetMoonInfo(today, 35.0, 135.0)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Internal server error")
		return
	}
	output.MoonAge = moonInfo.GetMoonAge()

	c.JSON(http.StatusOK, output)
}

type MoonRiseSetOutputForm struct {
	RiseSet RiseAndSet `json:"rise_and_set"`
}

type RiseAndSet struct {
	MoonRise string `json:"moonrise_hm"`
	MoonSet  string `json:"moonset_hm"`
}

func GetMoonRiseSet(c *gin.Context) {
	prefecture := c.Query("pref")

	var output MoonRiseSetOutputForm

	today := time.Now()
	lat, lng := utils.GetPrefectureCenter(prefecture)
	moonInfo, err := utils.GetMoonInfo(today, lat, lng)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Internal server error")
		return
	}

	const layout = "15:04"
	moonRise := time.Unix(moonInfo.MoonRise.GetSeconds(), 0).UTC()
	moonRiseStr := moonRise.Format(layout)
	if today.Day() != moonRise.Day() {
		moonRiseStr = "--:--"
	}
	moonSet := time.Unix(moonInfo.MoonSet.GetSeconds(), 0).UTC()
	moonSetStr := moonSet.Format(layout)
	if today.Day() != moonSet.Day() {
		moonSetStr = "--:--"
	}
	output.RiseSet = RiseAndSet{
		MoonRise: moonRiseStr,
		MoonSet:  moonSetStr,
	}

	c.JSON(http.StatusOK, output)
}

type MoonAge struct {
	Age float64 `json:"moon_age"`
}

type MoonRiseSet struct {
	RiseSet RiseAndSet `json:"rise_and_set"`
}

type Result struct {
	Date       time.Time   `json:"date"`
	MoonAge    MoonAge     `json:"moonAge"`
	RiseAndSet MoonRiseSet `json:"riseAndSet"`
}

type GetMoonRiseSetAgeMonthlyOutputForm struct {
	Results []Result `json:"results"`
}

func GetMoonRiseSetAgeMonthly(c *gin.Context) {
	prefecture := c.Query("pref")
	year, _ := strconv.Atoi(c.Query("year"))
	month, _ := strconv.Atoi(c.Query("month"))
	lat, lng := utils.GetPrefectureCenter(prefecture)

	var output GetMoonRiseSetAgeMonthlyOutputForm
	fromDate := time.Date(year, time.Month(month), 1, 0, 0, 0, 0, time.UTC)
	toDate := time.Date(year, time.Month(month+1), 1, 0, 0, 0, 0, time.UTC).AddDate(0, 0, -1)
	for d := fromDate; d.Unix() <= toDate.Unix(); d = d.AddDate(0, 0, 1) {
		moonInfo, err := utils.GetMoonInfo(d, lat, lng)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Internal server error")
			return
		}

		const layout = "15:04"
		moonRise := time.Unix(moonInfo.MoonRise.GetSeconds(), 0).UTC()
		moonRiseStr := moonRise.Format(layout)
		if d.Day() != moonRise.Day() {
			moonRiseStr = "--:--"
		}
		moonSet := time.Unix(moonInfo.MoonSet.GetSeconds(), 0).UTC()
		moonSetStr := moonSet.Format(layout)
		if d.Day() != moonSet.Day() {
			moonSetStr = "--:--"
		}

		output.Results = append(output.Results, Result{Date: d, MoonAge: MoonAge{Age: moonInfo.MoonAge}, RiseAndSet: MoonRiseSet{
			RiseSet: RiseAndSet{
				MoonRise: moonRiseStr,
				MoonSet:  moonSetStr,
			},
		}})
	}

	c.JSON(http.StatusOK, output)
}
