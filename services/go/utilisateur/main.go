package main

import (
	"PIEN/internal"
	"flag"
	"net/http"
)

func main() {
	port := flag.String("port", ":8080", "port to listen on")

	appBuilder := internal.NewAppBuilder()

	app, err := appBuilder.Build()
	if err != nil {
		panic(err)
	}

	routes := route(app)

	server := http.Server{
		Addr:     *port,
		ErrorLog: app.GetLogger(),
		Handler:  routes,
	}

	err = server.ListenAndServe()
	if err != nil {
		panic(err)
	}

}
