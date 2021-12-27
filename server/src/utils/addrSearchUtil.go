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
	Name       string `json:"name"`
	PostalCode string `json:"postalCode"`
	Prefecture string `json:"prefecture"`
	Address    string `json:"address"`
}

func GetAddrByName(name string) (GetAddrByNameOutputForm, error) {
	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Fatalf("error: %v", loadErr)
	}
	API_KEY := os.Getenv("GOOGLE_GEOCODING_API_KEY")

	var geocodingOutputForm GoogleGeocodingOutputForm

	response, _ := http.Get("https://maps.googleapis.com/maps/api/geocode/json?language=ja" +
		"&address=" + name +
		"&key=" + API_KEY)
	responseBody, _ := ioutil.ReadAll(response.Body)
	defer response.Body.Close()

	if err := json.Unmarshal(responseBody, &geocodingOutputForm); err != nil {
		return GetAddrByNameOutputForm{}, err
	}

	var output GetAddrByNameOutputForm
	output.Name = getAddressComponentByType(geocodingOutputForm, "point_of_interest")
	output.PostalCode = getAddressComponentByType(geocodingOutputForm, "postal_code")
	output.Prefecture = getAddressComponentByType(geocodingOutputForm, "administrative_area_level_1")
	output.Address = getAddressComponentByType(geocodingOutputForm, "locality") +
		getAddressComponentByType(geocodingOutputForm, "sublocality_level_2") +
		getAddressComponentByType(geocodingOutputForm, "premise")

	return output, nil
}

func getAddressComponentByType(geocodingOutputForm GoogleGeocodingOutputForm, t string) string {
	for _, addressComponent := range geocodingOutputForm.Results[0].AddressComponents {
		if contains(addressComponent.Types, t) {
			return addressComponent.LongName
		}
	}
	return ""
}

func contains(s []string, e string) bool {
	for _, v := range s {
		if e == v {
			return true
		}
	}
	return false
}
