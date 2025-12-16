package domain

type Module struct {
	BaseModel
	Titre              string              `gorm:"column:titre;not null;size:255" json:"titre"`
	Description        string              `gorm:"column:description" json:"description"`
	Objectifs          string              `gorm:"column:objectifs" json:"objectifs"`
	CompetencesCiblees string              `gorm:"column:competences_ciblees" json:"competences_ciblees"`
	Prerequis          string              `gorm:"column:prerequis" json:"prerequis"`
	Ordre              int                 `gorm:"column:ordre;not null" json:"ordre"`
	Lecons             []Lesson            `gorm:"foreignKey:ModuleID" json:"lecons,omitempty"`
	Commentaires       []CommentaireModule `gorm:"foreignKey:ModuleID" json:"commentaires,omitempty"`
	ClassId            uint64              `gorm:"column:classe_id;not null" json:"classId"`
}
