package internal

import (
	"log"
	"os"

	"gorm.io/gorm"
)

type App struct {
	port   string
	logger *log.Logger
	db     *gorm.DB
	Token  *Token
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
	databaseEngine string
	dsn            string
	port           string
	logger         *log.Logger
	db             *gorm.DB
	secret         string
}

func NewAppBuilder() *AppBuilder {
	logger := log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime)
	return &AppBuilder{logger: logger}
}

func (a *AppBuilder) Secret(secret string) {
	a.secret = secret
}

func (a *AppBuilder) Port(port string) {
	a.port = port
}

func (a *AppBuilder) Logger(logger *log.Logger) {
	a.logger = logger
}

func (a *AppBuilder) DB(engine, dsn string) {
	a.databaseEngine = engine
	a.dsn = dsn
}

func (a *AppBuilder) Build() (*App, error) {
	if a.port == "" {
		return nil, nil
	}

	db, err := db(a.databaseEngine, a.dsn)
	if err != nil {
		return nil, err
	}
	a.db = db

	return &App{
		port:   a.port,
		logger: a.logger,
		db:     a.db,
		Token:  New(a.secret),
	}, nil
}
