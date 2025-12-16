package repository

import "PIEN/cours/domain"

type ModuleRepository interface {
	ListClassModules(uint64) ([]domain.Module, error)
}

type LessonRepository interface {
	ListModuleLessons(uint64) ([]domain.Lesson, error)
}
