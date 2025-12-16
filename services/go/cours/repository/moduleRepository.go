package repository

import (
	"PIEN/cours/domain"

	"gorm.io/gorm"
)

type appModuleRepository struct {
	db *gorm.DB
}

func NewModuleRepository(db *gorm.DB) ModuleRepository {
	return &appModuleRepository{db: db}
}

func (r *appModuleRepository) ListClassModules(classId uint64) ([]domain.Module, error) {
	var modules []domain.Module

	result := r.db.Where(&domain.Module{ClassId: classId}).Find(&modules)
	return modules, result.Error
}
