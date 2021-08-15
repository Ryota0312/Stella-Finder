package main

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"stella-finder-server/src/controller"
)

func main() {
	serve()
}

func serve() {
	router := gin.Default()
	store, _ := redis.NewStore(10, "tcp", "redis:6379", "", []byte("secret"))
	router.Use(sessions.Sessions("session", store))

	auth := router.Group("/auth")
	{
		auth.POST("/login", controller.Login)
		auth.GET("/logout", controller.Logout)
	}

	// API (NOT　need Authorize)
	api := router.Group("/api")
	{
		api.GET("/spots", controller.GetSpots)
		api.GET("/getUser", controller.GetUser)
	}

	// API (need Authorize)
	authRequiredAPI := router.Group("/api/user")
	authRequiredAPI.Use(sessionCheck())
	{
		authRequiredAPI.GET("/getUser", controller.GetUser)
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

func sessionCheck() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		loginName := session.Get("loginName")

		if loginName == nil {
			// 認証に失敗した場合の処理はフロント側で行う
			c.JSON(http.StatusUnauthorized, "Unauthorized.")
			c.Abort()
		} else {
			c.Next()
		}
	}
}
