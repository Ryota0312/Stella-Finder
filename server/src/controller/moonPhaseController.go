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
	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		panic(err)
	}
	time.Local = jst

	today := time.Now()

	var output MoonAgeOutputForm

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
	cacheKey := todayString + "-" + prefecture + "-moonriseset"

	var output MoonRiseSetOutputForm

	cache, err := cacheDb.Get(cacheKey)
	if cache == nil {
		lat, lng := utils.GetPrefectureCenter(prefecture)

		response, _ := http.Get("https://labs.bitmeister.jp/ohakon/json/?mode=sun_moon_rise_set" +
			"&year=" + strconv.Itoa(today.Year()) +
			"&month=" + strconv.Itoa(int(today.Month())) +
			"&day=" + strconv.Itoa(today.Day()) +
			"&lat=" + strconv.FormatFloat(lat, 'f', -1, 64) +
			"&lng=" + strconv.FormatFloat(lng, 'f', -1, 64))
		responseBody, _ := ioutil.ReadAll(response.Body)
		defer response.Body.Close()

		if err := json.Unmarshal(responseBody, &output); err != nil {
			c.JSON(http.StatusInternalServerError, "Internal server error")
			return
		}

		err = cacheDb.Set(cacheKey, responseBody, 60*60*24)
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

	cacheDb := utils.NewCacheDb()
	defer cacheDb.CloseCacheDb()

	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		panic(err)
	}
	time.Local = jst

	var output GetMoonRiseSetAgeMonthlyOutputForm
	fromDate := time.Date(year, time.Month(month), 1, 0, 0, 0, 0, jst)
	toDate := time.Date(year, time.Month(month+1), 1, 0, 0, 0, 0, jst).AddDate(0, 0, -1)
	for d := fromDate; d.Unix() <= toDate.Unix(); d = d.AddDate(0, 0, 1) {
		var moonAge, err = getMoonAge(d, cacheDb)
		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
			return
		}

		riseSet, err := getMoonRiseSet(prefecture, d, cacheDb)
		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
			return
		}

		output.Results = append(output.Results, Result{Date: d, MoonAge: moonAge, RiseAndSet: riseSet})
	}

	c.JSON(http.StatusOK, output)
}

func getMoonAge(d time.Time, cacheDb *utils.Redis) (MoonAge, error) {
	var moonAge MoonAge

	const layout = "2006-01-02"
	cache, err := cacheDb.Get(d.Format(layout))
	if cache == nil {
		response, _ := http.Get("https://labs.bitmeister.jp/ohakon/json/?mode=moon_age" +
			"&year=" + strconv.Itoa(d.Year()) +
			"&month=" + strconv.Itoa(int(d.Month())) +
			"&day=" + strconv.Itoa(d.Day()))
		responseBody, _ := ioutil.ReadAll(response.Body)
		defer response.Body.Close()

		if err := json.Unmarshal(responseBody, &moonAge); err != nil {
			return moonAge, err
		}

		err = cacheDb.Set(d.Format(layout), responseBody, 60*60*24) // FIXME: 月末まで保持
		if err != nil {
			return moonAge, err
		}

	} else {
		err = json.Unmarshal(cache, &moonAge)
		if err != nil {
			return moonAge, err
		}
	}

	return moonAge, nil
}

func getMoonRiseSet(prefecture string, d time.Time, cacheDb *utils.Redis) (MoonRiseSet, error) {
	var riseSet MoonRiseSet
	const layout = "2006-01-02"
	dateString := d.Format(layout)
	cacheKey := dateString + "-" + prefecture + "-moonriseset"

	cache, err := cacheDb.Get(cacheKey)
	if cache == nil {
		lat, lng := utils.GetPrefectureCenter(prefecture)

		response, _ := http.Get("https://labs.bitmeister.jp/ohakon/json/?mode=sun_moon_rise_set" +
			"&year=" + strconv.Itoa(d.Year()) +
			"&month=" + strconv.Itoa(int(d.Month())) +
			"&day=" + strconv.Itoa(d.Day()) +
			"&lat=" + strconv.FormatFloat(lat, 'f', -1, 64) +
			"&lng=" + strconv.FormatFloat(lng, 'f', -1, 64))
		responseBody, _ := ioutil.ReadAll(response.Body)
		defer response.Body.Close()

		if err := json.Unmarshal(responseBody, &riseSet); err != nil {
			return riseSet, err
		}

		err = cacheDb.Set(cacheKey, responseBody, 60*60*24) // FIXME: 月末まで保持
		if err != nil {
			return riseSet, err
		}

	} else {
		err = json.Unmarshal(cache, &riseSet)
		if err != nil {
			return riseSet, err
		}
	}

	return riseSet, nil
}
