package main

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type GlbModel struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name         string             `bson:"name" json:"name"`
	Description  string             `bson:"description" json:"description"`
	ThumbnailUrl string             `bson:"thumbnailUrl" json:"thumbnailUrl"`
	Url          string             `bson:"url" json:"url"`
	Categorie    string             `bson:"categorie" json:"categorie"`
	Tags         []string           `bson:"tags" json:"tags"`
}

type Environment struct {
	ID   primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name string             `bson:"name" json:"name"`
	Url  string             `bson:"url" json:"url"`
}
