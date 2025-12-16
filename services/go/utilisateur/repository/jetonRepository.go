package repository

import (
	"PIEN/utilisateur/domain"

	"gorm.io/gorm"
)

type JetonRepository struct {
	db *gorm.DB
}

func NewJetonRepository(db *gorm.DB) JetonDB {
	return &JetonRepository{db}
}

func (repository *JetonRepository) Find(valeur string, scope domain.JetonScope) (*domain.Jeton, error) {
	var jeton domain.Jeton
	result := repository.db.Table("jetons").Where(&domain.Jeton{Valeur: valeur, Porte: scope}).First(&jeton)
	return &jeton, result.Error
}

func (repository *JetonRepository) Create(jeton *domain.Jeton) error {
	result := repository.db.Table("jetons").Save(jeton)
	return result.Error
}

func (repository *JetonRepository) Update(jeton *domain.Jeton) error {
	result := repository.db.Save(jeton)
	return result.Error
}

func (repository *JetonRepository) InvalidateForUserAndScope(userID int64, scope domain.JetonScope) error {
	result := repository.db.Table("jetons").Where(&domain.Jeton{UtilisateurID: userID, Porte: scope}).Update("est_revoque", true)
	return result.Error
}
