package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

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

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()

	appBuilder := NewAppBuilder(ctx)
	appBuilder.Port(viper.GetString("server.port"))

	cf := viper.GetStringMapString("database")
	dsn := fmt.Sprintf("mongodb://%s:%s@%s:%s/%s?authSource=%s", cf["user"], cf["password"], cf["host"], cf["port"], cf["dbname"], cf["authsource"])
	appBuilder.DB(dsn)

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
