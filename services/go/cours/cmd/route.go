package main

import (
	"PIEN/cours/repository"
	"net/http"

	"github.com/gin-gonic/gin"
)

func route(app *App) http.Handler {
	router := gin.Default()

	modelRepository := newGlbModelRepository(app.GetDb())
	hdrRepository := newHdrRepository(app.GetDb())
	moduleRepository := repository.NewModuleRepository(app.GetDb())
	lessonsRepository := repository.NewLessonRepository(app.GetDb())

	router.GET("/cours/models", listModels(app, modelRepository))
	router.GET("/cours/models/presets", listEnvironment(app, hdrRepository))
	router.GET("/cours/classes/:classId/modules/:moduleId/lessons", getLecons(app, lessonsRepository))
	router.GET("/cours/classes/:classId/modules", listClassModules(app, moduleRepository))

	return router
}
