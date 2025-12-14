package main

import (
	"PIEN/internal"
	"context"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type App struct {
	port   string
	logger *log.Logger
	db     *gorm.DB
}

func (a *App) GetDb() *gorm.DB {
	return a.db
}

func (a *App) GetLogger() *log.Logger {
	return a.logger
}

func (a *App) Infos(s string) {
	a.logger.Println(s)
}

func (a *App) Error(e error) {
	a.logger.Println(e.Error())
}

func (a *App) Success(c *gin.Context, code int, data interface{}) {
	response := internal.SuccessResponse{Status: 0, Data: data, Message: ""}
	c.JSON(code, response)
}

type AppBuilder struct {
	dsn    string
	port   string
	logger *log.Logger
	db     *gorm.DB
	ctx    context.Context
}

func NewAppBuilder(ctx context.Context) *AppBuilder {
	logger := log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime)
	return &AppBuilder{logger: logger, ctx: ctx}
}

func (a *AppBuilder) Port(port string) {
	a.port = port
}

func (a *AppBuilder) Logger(logger *log.Logger) {
	a.logger = logger
}

func (a *AppBuilder) DB(dsn string) {
	a.dsn = dsn
}

func (a *AppBuilder) Build() (*App, error) {
	if a.port == "" {
		return nil, nil
	}

	db, err := db(a.dsn)
	if err != nil {
		return nil, err
	}

	return &App{
		port:   a.port,
		logger: a.logger,
		db:     db,
	}, nil
}
