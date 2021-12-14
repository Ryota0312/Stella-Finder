package utils

import (
	"github.com/disintegration/imaging"
	"github.com/rwcarlsen/goexif/exif"
	"golang.org/x/image/draw"
	"image"
	"image/color"
	_ "image/gif"
	"image/jpeg"
	_ "image/jpeg"
	_ "image/png"
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

		if err := jpeg.Encode(newImg, imaging.Rotate(newImgData, GetImageRotation(filename), color.Gray{}), &jpeg.Options{Quality: 100}); err != nil {
			return "", nil
		}
	}

	return resizedFilePath, nil
}

func Exists(filepath string) bool {
	_, err := os.Stat(filepath)
	return err == nil
}

func GetImageRotation(filename string) float64 {
	data, err := os.Open(GetOriginalImagePath(filename))
	if err != nil {
		return 0
	}
	defer data.Close()

	// Exif の orientation 情報から何度回転するかを取得
	imgExif, err := exif.Decode(data)
	var rotation float64 = 0
	if err == nil {
		orientationRaw, err := imgExif.Get("Orientation")

		if err == nil {
			orientation := orientationRaw.String()

			if orientation == "3" {
				rotation = 180
			} else if orientation == "6" {
				rotation = 270
			} else if orientation == "8" {
				rotation = 90
			}
		}
	}

	return rotation
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
