package utils

import (
	"encoding/json"
	"github.com/joho/godotenv"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type GetAddrByNameOutputForm struct {
	Name       string
	PostalCode string
	Prefecture string
	Address    string
}

func GetAddrByName(name string) (LatLng, error) {
	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Fatalf("error: %v", loadErr)
	}
	API_KEY := os.Getenv("GOOGLE_GEOCODING_API_KEY")

	var output GoogleGeocodingOutputForm

	response, _ := http.Get("https://maps.googleapis.com/maps/api/geocode/json?" +
		"address=" + name +
		"&key=" + API_KEY)
	responseBody, _ := ioutil.ReadAll(response.Body)
	defer response.Body.Close()

	if err := json.Unmarshal(responseBody, &output); err != nil {
		return LatLng{}, err
	}

	output.Results[0].AddressComponents

	return nil.nil
}
