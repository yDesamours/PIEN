package main

import (
	"PIEN/internal"
	"flag"
	"fmt"
	"log"
	"net/http"
)

func main() {
	port := flag.String("port", "8081", "port to listen on")
	secret := flag.String("secret", "secret", "secret to use for jwt")
	flag.Parse()

	appBuilder := internal.NewAppBuilder()
	appBuilder.Port(*port)
	appBuilder.DB("postgres", "host=localhost  user=postgres password=admin dbname=pien_user port=5432 sslmode=disable")
	appBuilder.Secret(*secret)

	app, err := appBuilder.Build()
	if err != nil {
		panic(err)
	}

	routes := route(app)

	server := http.Server{
		Addr:     fmt.Sprintf(":%s", *port),
		ErrorLog: app.GetLogger(),
		Handler:  routes,
	}

	log.Println("Starting application on port", *port)
	err = server.ListenAndServe()
	if err != nil {
		panic(err)
	}

}
