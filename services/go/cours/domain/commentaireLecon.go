package domain

import "time"

type CommentaireLecon struct {
	ID         uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	LeconID    uint      `gorm:"column:lecon_id;not null" json:"lecon_id"`
	UserID     uint      `gorm:"column:user_id;not null" json:"user_id"`
	ParentID   uint      `gorm:"column:parent_id" json:"parent_id"`
	Contenu    string    `gorm:"column:contenu" json:"contenu"`
	Horodatage time.Time `gorm:"column:horodatage" json:"horodatage"`

	Lecon   Lesson             `gorm:"foreignKey:LeconID" json:"lecon,omitempty"`
	Parent  *CommentaireLecon  `gorm:"foreignKey:ParentID" json:"parent,omitempty"`
	Enfants []CommentaireLecon `gorm:"foreignKey:ParentID" json:"enfants,omitempty"`
}
