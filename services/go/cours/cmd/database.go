package main

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func db(dsn string) (*gorm.DB, error) {

	return gorm.Open(postgres.Open(dsn))

}
