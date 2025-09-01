package main

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func db(dsn string, ctx context.Context) (*mongo.Client, error) {

	clientOptions := options.Client().ApplyURI(dsn)
	return mongo.Connect(ctx, clientOptions)

}
