package main

import (
	"gorm.io/gorm"
)

type MultimediaRepository interface {
	findByUrl(string) (MultimediaFile, error)
}

type GormMultimediaFileRepository struct {
	db *gorm.DB
}

func newMultiMediaRepository(db *gorm.DB) *GormMultimediaFileRepository {
	return &GormMultimediaFileRepository{db: db}
}

func (r *GormMultimediaFileRepository) findByUrl(url string) (MultimediaFile, error) {
	var file MultimediaFile
	result := r.db.Table("multimedia_file").Where("url=?", url).Find(&file)
	return file, result.Error
}
