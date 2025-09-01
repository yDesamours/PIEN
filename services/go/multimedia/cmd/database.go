package main

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func db(engine, dsn string) (*gorm.DB, error) {
	switch engine {
	case "postgres":
		return gorm.Open(postgres.Open(dsn))
	default:
		return nil, fmt.Errorf("engine not supported")
	}

}
