package main

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	"hoshi-atsume-server/src/controller"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
)

func main() {
	serve()
}

func serve() {
	router := gin.Default()
	store, _ := redis.NewStore(10, "tcp", "redis:6379", "", []byte("secret"))
	router.Use(sessions.Sessions("session", store))

	api := router.Group("/api")
	{
		api.GET("/spots", controller.GetSpots)
		api.POST("/login", controller.Login)
		api.GET("/logout", controller.Logout)
		api.GET("/user", controller.User)
	}

	// Proxy to Next.js
	router.NoRoute(ReverseProxy)

	if err := router.Run(":3001"); err != nil {
		log.Fatal("Server Run Failed: ", err)
	}
}

func ReverseProxy(c *gin.Context) {
	remote, _ := url.Parse("http://host.docker.internal:3000")
	proxy := httputil.NewSingleHostReverseProxy(remote)
	proxy.Director = func(req *http.Request) {
		req.Header = c.Request.Header
		req.Host = remote.Host
		req.URL = c.Request.URL
		req.URL.Scheme = remote.Scheme
		req.URL.Host = remote.Host
	}

	proxy.ServeHTTP(c.Writer, c.Request)
}
