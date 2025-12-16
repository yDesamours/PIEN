package domain

type VersionContenu struct {
	ID             uint `gorm:"primaryKey;autoIncrement" json:"id"`
	ContenuLeconID uint `gorm:"column:contenu_lecon_id;not null" json:"contenu_lecon_id"`
	NumeroVersion  int  `gorm:"column:numero_version;not null" json:"numero_version"`

	ContenuLecon ContenuLecon `gorm:"foreignKey:ContenuLeconID" json:"contenu_lecon,omitempty"`
}
