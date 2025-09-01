package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func route(app *App) http.Handler {
	router := gin.Default()
	multiMediaRepository := newMultiMediaRepository(app.db)
	storage := newFileStorage()

	router.GET("/multimedia/:url", GetFileByIdHandler(app, multiMediaRepository, storage))

	return router
}
