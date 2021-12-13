package utils

import (
	"golang.org/x/image/draw"
	"image"
	"image/jpeg"
	_ "image/jpeg"
	"math"
	"os"
	"strconv"
)

func GetResizedImage(filename string, limitEdge int) (string, error) {
	resizedFilePath := GetResizedImagePath(ConvertResizedFilename(filename, limitEdge))
	if !Exists(resizedFilePath) {
		data, err := os.Open(GetOriginalImagePath(filename))
		if err != nil {
			return "", err
		}
		defer data.Close()

		imgData, _, err := image.Decode(data)
		imgRectangle := imgData.Bounds()
		width := imgRectangle.Dx()
		height := imgRectangle.Dy()

		newImgData := &image.RGBA{}
		if width >= height {
			f := float64(width * limitEdge)
			w := math.Round(f / float64(height))
			newImgData = image.NewRGBA(image.Rect(0, 0, int(w), limitEdge))
		} else {
			f := float64(limitEdge * height)
			h := math.Round(f / float64(width))
			newImgData = image.NewRGBA(image.Rect(0, 0, limitEdge, int(h)))
		}

		draw.CatmullRom.Scale(newImgData, newImgData.Bounds(), imgData, imgRectangle, draw.Over, nil)
		newImg, err := os.Create(resizedFilePath)
		if err != nil {
			return "", nil
		}
		defer newImg.Close()

		if err := jpeg.Encode(newImg, newImgData, &jpeg.Options{Quality: 100}); err != nil {
			return "", nil
		}
	}

	return resizedFilePath, nil
}

func Exists(filepath string) bool {
	_, err := os.Stat(filepath)
	return err == nil
}

func GetOriginalImagePath(filename string) string {
	dir, _ := os.Getwd()
	return dir + "/uploadedImages/" + filename
}

func GetResizedImagePath(filename string) string {
	dir, _ := os.Getwd()
	return dir + "/uploadedImages/resized/" + filename
}

func ConvertResizedFilename(filename string, limitEdge int) string {
	return filename + "_" + "s" + strconv.Itoa(limitEdge)
}
