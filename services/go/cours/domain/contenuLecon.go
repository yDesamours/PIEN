package domain

import "time"

type ContenuLecon struct {
	ID           uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	LeconID      uint      `gorm:"column:lecon_id;not null" json:"lecon_id"`
	Contenu      JSONB     `gorm:"type:jsonb" json:"contenu"`
	DateCreation time.Time `gorm:"column:date_creation" json:"date_creation"`

	Lecon    Lesson           `gorm:"foreignKey:LeconID" json:"lecon,omitempty"`
	Versions []VersionContenu `gorm:"foreignKey:ContenuLeconID" json:"versions,omitempty"`
}
