package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func route(app *App) http.Handler {
	router := gin.Default()

	router.POST("/utilisateurs/login", login(app))
	router.GET("/utilisateurs/me", me(app))

	return router
}
