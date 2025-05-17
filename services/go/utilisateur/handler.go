package main

import (
	"PIEN/internal"
	"net/http"

	"github.com/gin-gonic/gin"
)

func createUsers(app *internal.App, repo *UtilisateurRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		user := &Utilisateur{}
		err := c.BindJSON(user)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		repo.create(user)

		c.JSON(http.StatusCreated, user)

	}
}

func updateUser(app *internal.App, repo *UtilisateurRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		user := &Utilisateur{}
		err := c.BindJSON(user)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}
}
