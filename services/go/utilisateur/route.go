package main

import (
	"PIEN/internal"
	"net/http"

	"github.com/gin-gonic/gin"
)

func route(app *internal.App) http.Handler {
	router := gin.Default()
	utilisateurRepository := newUtilisateurRepository(app.GetDb())

	router.GET("/users", createUsers(app, utilisateurRepository))

	return router
}
