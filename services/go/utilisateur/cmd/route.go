package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func route(app *App) http.Handler {
	router := gin.Default()
	utilisateurRepository := newUtilisateurRepository(app.GetDb())
	jetonRepository := newJetonRepository(app.GetDb())

	router.POST("/utilisateurs/login", login(app, utilisateurRepository, jetonRepository))
	router.GET("/utilisateurs/me", me(app, utilisateurRepository, jetonRepository))

	return router
}
