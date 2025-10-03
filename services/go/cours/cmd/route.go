package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func route(app *App) http.Handler {
	router := gin.Default()

	modelRepository := newGlbModelRepository(app.GetDb())
	hdrRepository := newHdrRepository(app.db)

	router.GET("/cours/models", listModels(app, modelRepository))
	router.GET("/cours/models/presets", listEnvironment(app, hdrRepository))

	return router
}
