package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetFileByIdHandler(app *App, repo MultimediaRepository, storage fileStorage) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		url, _ := ctx.Params.Get("url")

		if cachedFile, ok := app.cache.Get(url); ok {
			content, ok := (cachedFile.GetContent()).([]byte)
			if ok {
				contentType := http.DetectContentType(content)
				ctx.Data(http.StatusOK, contentType, content)
				return
			}

		}

		multimedia, err := repo.findByUrl(url)
		if err != nil {
			return
		}
		savedFile, err := storage.open(multimedia.Path)
		if err != nil {
			return
		}
		contentType := http.DetectContentType(savedFile)

		app.cache.Put(url, savedFile)
		ctx.Data(http.StatusOK, contentType, savedFile)

	}
}
