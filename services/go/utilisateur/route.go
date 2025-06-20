package main

import (
	"PIEN/internal"
	"net/http"

	"github.com/gin-gonic/gin"
)

func route(app *internal.App) http.Handler {
	router := gin.Default()
	utilisateurRepository := newUtilisateurRepository(app.GetDb())

	router.POST("/login", login(app, utilisateurRepository))

	return router
}
