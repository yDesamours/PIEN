package main

import (
	"PIEN/internal"
	"net/http"

	"github.com/gin-gonic/gin"
)

func route(app *internal.App) http.Handler {
	router := gin.Default()
	utilisateurRepository := newUtilisateurRepository(app.GetDb())
	jetonRepository := newJetonRepository(app.GetDb())

	router.POST("/login", login(app, utilisateurRepository, jetonRepository))
	router.GET("/me", me(app, utilisateurRepository, jetonRepository))

	return router
}
