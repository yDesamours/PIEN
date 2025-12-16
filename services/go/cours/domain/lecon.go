package domain

type Lesson struct {
	BaseModel
	ModuleID           uint64 `gorm:"column:module_id;not null" json:"module_id"`
	Titre              string `gorm:"column:titre;not null;size:255" json:"titre"`
	Description        string `gorm:"column:description" json:"description"`
	Objectifs          string `gorm:"column:objectifs" json:"objectifs"`
	CompetencesCiblees string `gorm:"column:competences_ciblees" json:"competences_ciblees"`
	Prerequis          string `gorm:"column:prerequis" json:"prerequis"`
	Ordre              int    `gorm:"column:ordre;not null" json:"ordre"`
	VersionActiveID    *uint  `gorm:"column:version_active_id" json:"version_active_id"` // Peut être NULL

	ContenuLecons []ContenuLecon     `gorm:"foreignKey:LeconID" json:"contenu_lecons,omitempty"`
	Commentaires  []CommentaireLecon `gorm:"foreignKey:LeconID" json:"commentaires,omitempty"`
	VersionActive *ContenuLecon      `gorm:"foreignKey:VersionActiveID" json:"version_active,omitempty"`
}
