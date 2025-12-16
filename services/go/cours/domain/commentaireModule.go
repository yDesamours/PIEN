package domain

import "time"

type CommentaireModule struct {
	ID         uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	ModuleID   uint      `gorm:"column:module_id;not null" json:"module_id"`
	UserID     uint      `gorm:"column:user_id;not null" json:"user_id"`
	ParentID   *uint     `gorm:"column:parent_id" json:"parent_id"`
	Contenu    string    `gorm:"column:contenu" json:"contenu"`
	Horodatage time.Time `gorm:"column:horodatage" json:"horodatage"`

	Module  Module              `gorm:"foreignKey:ModuleID" json:"module,omitempty"`
	Parent  *CommentaireModule  `gorm:"foreignKey:ParentID" json:"parent,omitempty"`
	Enfants []CommentaireModule `gorm:"foreignKey:ParentID" json:"enfants,omitempty"`
}
