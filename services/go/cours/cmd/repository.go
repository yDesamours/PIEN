package main

import (
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/net/context"
)

type GlbModelRepository struct {
	c *mongo.Collection
}

func (repo *GlbModelRepository) GetAll(ctx context.Context) ([]GlbModel, error) {
	var models []GlbModel
	cursor, err := repo.c.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var model GlbModel
		err = cursor.Decode(&model)
		if err != nil {
			return nil, err
		}
		models = append(models, model)
	}

	return models, nil
}

func newGlbModelRepository(db *mongo.Database) *GlbModelRepository {
	return &GlbModelRepository{c: db.Collection("models")}
}

type HdrRepository struct {
	c *mongo.Collection
}

func newHdrRepository(db *mongo.Database) *HdrRepository {
	return &HdrRepository{
		c: db.Collection("modelsPresets"),
	}
}

func (r *HdrRepository) listEnvironments(ctx context.Context) ([]Environment, error) {
	var environments []Environment

	cursor, err := r.c.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var environment Environment

		err := cursor.Decode(&environment)
		if err != nil {
			return nil, err
		}
		environments = append(environments, environment)
	}

	return environments, nil
}
