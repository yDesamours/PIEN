package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/fsnotify/fsnotify"
	"github.com/spf13/viper"
)

func main() {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("fatal error config file: %w", err))
	}
	viper.OnConfigChange(func(e fsnotify.Event) {
		fmt.Println("Config file changed:", e.Name)
	})
	viper.WatchConfig()

	appBuilder := NewAppBuilder()
	appBuilder.Port(viper.GetString("server.port"))
	appBuilder.Secret(viper.GetString("encrypt.secret"))
	appBuilder.Mode(viper.GetString("mode"))

	cf := viper.GetStringMapString("database")
	dsn := fmt.Sprintf("host=%s  user=%s password=%s dbname=%s port=%s sslmode=%s", cf["host"], cf["user"], cf["password"], cf["dbname"], cf["port"], cf["sslmode"])
	appBuilder.DB(cf["engine"], dsn)

	app, err := appBuilder.Build()
	if err != nil {
		panic(err)
	}

	routes := route(app)

	server := http.Server{
		Addr:     fmt.Sprintf(":%s", app.port),
		ErrorLog: app.GetLogger(),
		Handler:  routes,
	}

	log.Println("Starting application on port", app.port)
	err = server.ListenAndServe()
	if err != nil {
		panic(err)
	}

}
