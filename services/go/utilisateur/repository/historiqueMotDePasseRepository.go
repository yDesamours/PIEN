package repository

import (
	"PIEN/utilisateur/domain"

	"gorm.io/gorm"
)

type HistoriqueMotDePasseRepository struct {
	db *gorm.DB
}

func NewHistoriqueMotDePasseRepository(db *gorm.DB) HistoriqueMotDePasseDB {
	return &HistoriqueMotDePasseRepository{db: db}
}

func (r *HistoriqueMotDePasseRepository) Create(historiqueMotDePasse *domain.HistoriqueMotDePasse) error {
	result := r.db.Create(historiqueMotDePasse)
	return result.Error
}

func (r *HistoriqueMotDePasseRepository) GetByUserID(utilisateurID string) ([]domain.HistoriqueMotDePasse, error) {
	var historiques []domain.HistoriqueMotDePasse
	result := r.db.Where("utilisateur_id = ?", utilisateurID).Find(&historiques)
	return historiques, result.Error
}
