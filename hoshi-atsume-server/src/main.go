package main

import (
	"github.com/gin-gonic/gin"
	"hoshi-atsume-server/src/controller"
	"log"
)

func main() {
	serve()
}

func serve()  {
	router := gin.Default()

	router.GET("/spots", controller.GetSpots)

	if err := router.Run(":3001"); err != nil {
		log.Fatal("Server Run Failed: ", err)
	}
}