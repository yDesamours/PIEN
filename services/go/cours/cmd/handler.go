package main

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func listModels(app *App, repo *GlbModelRepository) gin.HandlerFunc {

	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
		defer cancel()

		models, err := repo.GetAll(ctx)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		app.Success(c, http.StatusAccepted, models)

	}
}

func listEnvironment(app *App, repo *HdrRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
		defer cancel()

		environments, err := repo.listEnvironments(ctx)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		app.Success(c, http.StatusAccepted, environments)

	}
}

func getLecons(app *App) gin.HandlerFunc {
	return func(c *gin.Context) {
		lecons := `[{"id": 1, "title": "Lesson 1","description": "This is the first lesson","modification": "12-jan-2025"}]`

		c.JSON(http.StatusOK, lecons)
	}
}

func getLecon(app *App) gin.HandlerFunc {
	return func(c *gin.Context) {
		lecons := `[{"id": 1, "title": "Lesson 1","description": "This is the first lesson","modification": "12-jan-2025"}]`
		// lecons := `[]`

		c.JSON(http.StatusOK, lecons)
	}
}
