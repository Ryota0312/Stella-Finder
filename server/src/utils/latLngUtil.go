package utils

import (
	"encoding/json"
	"github.com/joho/godotenv"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

// source from https://www.benricho.org/chimei/latlng_data-center.html
var prefToLat = map[string]float64{
	"北海道":  43.420962,
	"青森県":  40.699056,
	"岩手県":  39.511756,
	"宮城県":  38.381565,
	"秋田県":  39.678886,
	"山形県":  38.497668,
	"福島県":  37.418743,
	"茨城県":  36.304975,
	"栃木県":  36.683168,
	"群馬県":  36.481484,
	"埼玉県":  36.003615,
	"千葉県":  35.473969,
	"東京都":  35.686991,
	"神奈川県": 35.403620,
	"新潟県":  37.368708,
	"富山県":  36.607484,
	"石川県":  36.772391,
	"福井県":  35.812610,
	"山梨県":  35.609615,
	"長野県":  36.149935,
	"岐阜県":  35.778724,
	"静岡県":  35.033282,
	"愛知県":  35.002511,
	"三重県":  34.484291,
	"滋賀県":  35.225920,
	"京都府":  35.220152,
	"大阪府":  34.598366,
	"兵庫県":  35.068625,
	"奈良県":  34.292803,
	"和歌山県": 33.848677,
	"鳥取県":  35.391534,
	"島根県":  34.975087,
	"岡山県":  34.861972,
	"広島県":  34.588492,
	"山口県":  34.226281,
	"徳島県":  33.915461,
	"香川県":  34.219680,
	"愛媛県":  33.661193,
	"高知県":  33.507085,
	"福岡県":  33.599679,
	"佐賀県":  33.279436,
	"長崎県":  32.955619,
	"熊本県":  32.587230,
	"大分県":  33.203809,
	"宮崎県":  32.200128,
	"鹿児島県": 31.355836,
	"沖縄県":  26.477084,
}

var prefToLng = map[string]float64{
	"北海道":  142.781281,
	"青森県":  140.726924,
	"岩手県":  141.399429,
	"宮城県":  140.941651,
	"秋田県":  140.392163,
	"山形県":  140.108578,
	"福島県":  140.231252,
	"茨城県":  140.385361,
	"栃木県":  139.817955,
	"群馬県":  138.923514,
	"埼玉県":  139.368331,
	"千葉県":  140.222304,
	"東京都":  139.539242,
	"神奈川県": 139.349213,
	"新潟県":  138.888731,
	"富山県":  137.287216,
	"石川県":  136.778841,
	"福井県":  136.184399,
	"山梨県":  138.628685,
	"長野県":  138.024588,
	"岐阜県":  137.057877,
	"静岡県":  138.312185,
	"愛知県":  137.208724,
	"三重県":  136.432514,
	"滋賀県":  136.139617,
	"京都府":  135.517902,
	"大阪府":  135.545261,
	"兵庫県":  134.794436,
	"奈良県":  135.896845,
	"和歌山県": 135.416815,
	"鳥取県":  133.850276,
	"島根県":  132.423277,
	"岡山県":  133.833990,
	"広島県":  132.792091,
	"山口県":  131.430559,
	"徳島県":  134.273465,
	"香川県":  133.979044,
	"愛媛県":  132.838719,
	"高知県":  133.364174,
	"福岡県":  130.682867,
	"佐賀県":  130.118294,
	"長崎県":  129.715641,
	"熊本県":  130.807836,
	"大分県":  131.411655,
	"宮崎県":  131.353483,
	"鹿児島県": 130.410976,
	"沖縄県":  127.922927,
}

func GetPrefectureCenter(prefecture string) (float64, float64) {
	return prefToLat[prefecture], prefToLng[prefecture]
}

type GoogleGeocodingOutputForm struct {
	Results []struct {
		AddressComponents []struct {
			LongName  string   `json:"long_name"`
			ShortName string   `json:"short_name"`
			Types     []string `json:"types"`
		} `json:"address_components"`
		Geometry struct {
			Location struct {
				Lat float64 `json:"lat"`
				Lng float64 `json:"lng"`
			} `json:"location"`
		} `json:"geometry"`
	} `json:"results"`
}

type LatLng struct {
	Lat float64
	Lng float64
}

func GetLocationBySpotId(address string) (LatLng, error) {
	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Fatalf("error: %v", loadErr)
	}
	API_KEY := os.Getenv("GOOGLE_GEOCODING_API_KEY")

	var output GoogleGeocodingOutputForm

	response, _ := http.Get("https://maps.googleapis.com/maps/api/geocode/json?" +
		"address=" + address +
		"&key=" + API_KEY)
	responseBody, _ := ioutil.ReadAll(response.Body)
	defer response.Body.Close()

	if err := json.Unmarshal(responseBody, &output); err != nil {
		return LatLng{}, err
	}

	return LatLng{Lat: output.Results[0].Geometry.Location.Lat, Lng: output.Results[0].Geometry.Location.Lng}, nil
}

func BuildAddressQuery(name string, postalCode string, prefecture string, address string) string {
	var formattedPostalCode string
	if postalCode == "" {
		formattedPostalCode = ""
	} else {
		formattedPostalCode = postalCode[0:2] + "-" + postalCode[3:]
	}

	formattedAddress := ""
	if formattedPostalCode != "" {
		formattedAddress += formattedPostalCode + "+"
	}
	formattedAddress += prefecture + "+"
	if address != "" {
		formattedAddress += address + "+"
	}
	formattedAddress += name

	return formattedAddress
}
