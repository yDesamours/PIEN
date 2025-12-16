package main

import (
	"PIEN/cours/repository"
	"context"
	"net/http"
	"strconv"
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

func listClassModules(app *App, repo repository.ModuleRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		classId, err := strconv.ParseInt(c.Params.ByName("classId"), 10, 64)
		if err != nil {
			return
		}

		modules, err := repo.ListClassModules(uint64(classId))
		if err != nil {
			return
		}

		app.Success(c, http.StatusOK, modules)

	}
}

func getLecons(app *App, repo repository.LessonRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		moduleId, err := strconv.ParseInt(c.Params.ByName("moduleId"), 10, 64)
		if err != nil {
			return
		}

		lessons, err := repo.ListModuleLessons(uint64(moduleId))
		if err != nil {
			return
		}

		app.Success(c, http.StatusOK, lessons)
	}
}

func getLecon(app *App) gin.HandlerFunc {
	return func(c *gin.Context) {
		lecons := `[{"id": 1, "title": "Lesson 1","description": "This is the first lesson","modification": "12-jan-2025"}]`
		// lecons := `[]`

		c.JSON(http.StatusOK, lecons)
	}
}
