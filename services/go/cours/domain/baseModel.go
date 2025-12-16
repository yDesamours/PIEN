package domain

import "time"

type JSONB map[string]interface{}

type BaseModel struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	CreatedAt time.Time `gorm:"column:date_creation" json:"date_creation"`
	UpdatedAt time.Time `gorm:"column:date_mise_a_jour" json:"date_mise_a_jour"`
}
