package internal

import (
	"log"

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

type AppBuilder struct {
	port   string
	logger *log.Logger
	db     *gorm.DB
}

func NewAppBuilder() *AppBuilder {
	return &AppBuilder{}
}

func (a *AppBuilder) Port(port string) {
	a.port = port
}

func (a *AppBuilder) Logger(logger *log.Logger) {
	a.logger = logger
}

func (a *AppBuilder) DB(db *gorm.DB) {
	a.db = db
}

func (a *AppBuilder) Build() (*App, error) {
	if a.port == "" {
		return nil, nil
	}

	if a.logger == nil {
		return nil, nil
	}

	if a.db == nil {
		return nil, nil
	}

	return &App{
		port:   a.port,
		logger: a.logger,
		db:     a.db,
	}, nil
}
