package main

import (
	"PIEN/internal"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type App struct {
	port                      string
	logger                    *log.Logger
	db                        *gorm.DB
	Token                     *Token
	mode                      string
	UserModel                 UserDB
	JetonModel                JetonDB
	HistoriqueMotDePasseModel HistoriqueMotDePasseDB
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
	databaseEngine string
	dsn            string
	port           string
	logger         *log.Logger
	db             *gorm.DB
	secret         string
	mode           string
}

func NewAppBuilder() *AppBuilder {
	logger := log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime)
	return &AppBuilder{logger: logger}
}

func (a *AppBuilder) Secret(secret string) {
	a.secret = secret
}

func (a *AppBuilder) Mode(mode string) {
	a.mode = mode
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

	// db, err := db(a.databaseEngine, a.dsn)
	// if err != nil {
	// 	return nil, err
	// }
	// a.db = db

	jetonRepository := a.jetonRepository()
	userRepository := a.utilisateurRepository()
	historiqueMotDePasseRepository := a.HistoriqueMotDePasseRepository()

	return &App{
		port:                      a.port,
		logger:                    a.logger,
		db:                        a.db,
		Token:                     New(a.secret),
		mode:                      a.mode,
		UserModel:                 userRepository,
		JetonModel:                jetonRepository,
		HistoriqueMotDePasseModel: historiqueMotDePasseRepository,
	}, nil
}

func (a *AppBuilder) utilisateurRepository() UserDB {
	if a.mode == "demo" {
		return NewUserFileDB("ressources/user.json")
	}

	return newUtilisateurRepository(a.db)

}

func (a *AppBuilder) jetonRepository() JetonDB {
	if a.mode == "demo" {
		return NewJetonFileDB("ressources/jeton.json")
	}

	return newJetonRepository(a.db)

}

func (a *AppBuilder) HistoriqueMotDePasseRepository() HistoriqueMotDePasseDB {
	if a.mode == "demo" {
		return NewHistoriqueMotDePasseFileDB("ressources/h.json")
	}

	return newHistoriqueMotDePasseRepository(a.db)

}
