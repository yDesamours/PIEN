package repository

import (
	"PIEN/cours/domain"

	"gorm.io/gorm"
)

type appLessonRepository struct {
	db *gorm.DB
}

func NewLessonRepository(db *gorm.DB) LessonRepository {
	return &appLessonRepository{db: db}
}

func (r *appLessonRepository) ListModuleLessons(moduleId uint64) ([]domain.Lesson, error) {
	var lessons []domain.Lesson

	result := r.db.
		Table("lecons").
		Where(&domain.Lesson{ModuleID: moduleId}).
		Select("titre", "description", "ordre", "date_creation").
		Find(&lessons)
	return lessons, result.Error
}
