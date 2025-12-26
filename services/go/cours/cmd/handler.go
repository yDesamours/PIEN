package main

import (
	"PIEN/cours/domain"
	"PIEN/cours/repository"
	"PIEN/cours/validator"
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

func listClassModules(app *App, repo repository.ModuleRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		classId, err := app.int64(c, "classId")
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

func getLecons(app *App, repo repository.ModuleRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		moduleId, err := app.int64(c, "moduleId")
		if err != nil {
			return
		}

		module, err := repo.ListModuleLessons(uint64(moduleId))
		if err != nil {
			return
		}

		app.Success(c, http.StatusOK, module.Lecons)
	}
}

func getLecon(app *App, repo repository.LessonRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		leconId, err := app.int64(c, "leconId")
		if err != nil {
			return
		}

		lecon, err := repo.GetById(leconId)
		if err != nil {
			return
		}
		app.Success(c, http.StatusOK, lecon)
	}
}

func getLessonActiveVersion(app *App, repo repository.LessonRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		leconId, err := app.int64(c, "leconId")
		if err != nil {
			return
		}

		lecon, err := repo.GetActiveVersion(leconId)
		if err != nil {
			return
		}
		app.Success(c, http.StatusOK, lecon)
	}
}

func getLessonVersion(app *App, repo repository.LessonRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		leconId, err := app.int64(c, "leconId")
		if err != nil {
			return
		}

		versionId, err := app.int64(c, "versionId")
		if err != nil {
			return
		}

		lecon, err := repo.GetLeconVersion(leconId, versionId)
		if err != nil {
			return
		}
		app.Success(c, http.StatusOK, lecon)
	}
}

func createLessonContent(app *App, repo repository.LessonRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		leconId, err := app.int64(c, "leconId")
		lecon, err := repo.GetById(leconId)
		if err != nil {
			return
		}

		var contentReceived Lesson
		err = c.BindJSON(&contentReceived)
		if err != nil {
			return
		}

		lessonContent := domain.ContenuLecon{LeconID: lecon.ID, Contenu: contentReceived.Contenu, ID: uint(contentReceived.Id)}
		lecon.ContenuLecons = append(lecon.ContenuLecons, lessonContent)
		lecon.Titre = contentReceived.Titre
		lecon.Description = contentReceived.Description

		err = repo.Save(&lecon)
		if err != nil {
			return
		}

		app.Success(c, http.StatusOK, lecon)
	}
}

func createModule(app *App, repo repository.ModuleRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		classId, err := app.int64(c, "classId")
		if err != nil {
			return
		}

		var module domain.Module

		err = c.BindJSON(&module)
		if err != nil {
			return
		}

		validator := validator.NewModuleValidator(module)
		if ok := validator.IsValid(); !ok {
			return
		}

		module.ClassId = uint64(classId)
		module.ID = 0

		err = repo.Save(&module)
		if err != nil {
			return
		}

		app.Success(c, http.StatusCreated, module)

	}
}

func updateModule(app *App, repo repository.ModuleRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		moduleId, err := app.int64(c, "moduleId")
		if err != nil {
			return
		}

		oldModule, err := repo.GetById(moduleId)
		if err != nil {
			return
		}

		var module domain.Module
		err = c.BindJSON(&module)
		if err != nil {
			return
		}

		validator := validator.NewModuleValidator(module)
		if ok := validator.IsValid(); !ok {
			return
		}

		module.ClassId = oldModule.ClassId
		module.ID = oldModule.ID

		err = repo.Save(&module)
		if err != nil {
			return
		}

		app.Success(c, http.StatusCreated, module)

	}
}

func createLesson(app *App, repo repository.LessonRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		moduleId, err := app.int64(c, "moduleId")
		if err != nil {
			return
		}

		var lesson domain.Lesson

		err = c.BindJSON(&lesson)
		if err != nil {
			return
		}

		validator := validator.NewLessonValidator(lesson)
		if ok := validator.IsValid(); !ok {
			return
		}

		lesson.ModuleID = uint64(moduleId)
		lesson.ID = 0

		err = repo.Save(&lesson)
		if err != nil {
			return
		}

		app.Success(c, http.StatusCreated, lesson)

	}
}

func getLessonContent(app *App, repo repository.LessonRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		lessonId, err := app.int64(c, "moduleId")
		if err != nil {
			return
		}

		lesson, err := repo.GetById(lessonId)
		if err != nil {
			return
		}

		app.Success(c, http.StatusOK, lesson)
	}
}

func getModule(app *App, repo repository.ModuleRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		moduleId, err := app.int64(c, "moduleId")
		if err != nil {
			return
		}

		module, err := repo.GetById(moduleId)
		if err != nil {
			return
		}

		app.Success(c, http.StatusOK, module)
	}
}
