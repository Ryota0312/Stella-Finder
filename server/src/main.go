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
		auth.POST("/tmpRegister", controller.TmpRegister)
		auth.POST("/register", controller.Register)
	}

	// API (NOT　need Authorize)
	api := router.Group("/api")
	{
		api.GET("/spots", controller.GetSpot)
		api.GET("/spot/list", controller.GetAllSpots)
		api.GET("/loginUser", controller.GetLoginUser)
		api.GET("/file/download", controller.GetFile)
	}

	// API (need Authorize)
	authRequiredAPI := router.Group("/api/user")
	authRequiredAPI.Use(sessionCheck())
	{
		authRequiredAPI.GET("/getUser", controller.GetLoginUser) // Deprecated
		// file/upload といいつつspotの更新をしている。今は決め打ちでspotId=2を更新。
		// TODO: これをspotの更新APIにする？
		authRequiredAPI.POST("/file/upload", controller.CreateFile)

		authRequiredAPI.POST("/spot/register", controller.CreateSpot)
		authRequiredAPI.POST("/spot/update", controller.UpdateSpot)
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
		mailAddress := session.Get("mailAddress")

		if mailAddress == nil {
			// 認証に失敗した場合の処理はフロント側で行う
			c.JSON(http.StatusUnauthorized, "Unauthorized.")
			c.Abort()
		} else {
			c.Next()
		}
	}
}
