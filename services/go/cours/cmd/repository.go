package main

import (
	"PIEN/cours/domain"
	"fmt"

	"golang.org/x/net/context"
	"gorm.io/gorm"
)

type GlbModelRepository struct {
	c *gorm.DB
}

func (repo *GlbModelRepository) GetAll(ctx context.Context) ([]domain.GlbModel, error) {
	var models []domain.GlbModel
	err := repo.c.Find(models).Error

	return models, err
}

func newGlbModelRepository(db *gorm.DB) *GlbModelRepository {
	return &GlbModelRepository{c: db}
}

type HdrRepository struct {
	c *gorm.DB
}

func newHdrRepository(db *gorm.DB) *HdrRepository {
	return &HdrRepository{
		c: db,
	}
}

func (r *HdrRepository) listEnvironments(ctx context.Context) ([]domain.Environment, error) {
	var environments []domain.Environment

	err := r.c.Find(environments).Error

	return environments, err
}

type leconRepository struct {
	c *gorm.DB
}

func newLeconRepository(db *gorm.DB) *leconRepository {
	return &leconRepository{
		c: db,
	}
}

const leconsSequenceName = "lecons_id_seq"

func (r *leconRepository) getNextLeconId(db *gorm.DB) (int64, error) {
	sqlQuery := fmt.Sprintf("SELECT nextval('%s')", leconsSequenceName)

	var nextID int64

	result := db.Raw(sqlQuery).Scan(&nextID)

	if result.Error != nil {
		return 0, result.Error
	}

	return nextID, nil
}
