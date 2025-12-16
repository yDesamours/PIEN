package repository

import (
	"PIEN/utilisateur/domain"

	"gorm.io/gorm"
)

type UtilisateurRepository struct {
	db *gorm.DB
}

func NewUtilisateurRepository(db *gorm.DB) *UtilisateurRepository {
	return &UtilisateurRepository{db}
}

func (r *UtilisateurRepository) Create(u *domain.Utilisateur) error {
	result := r.db.Create(u)
	return result.Error

}

func (r *UtilisateurRepository) Update(u *domain.Utilisateur) error {
	result := r.db.Save(u)
	return result.Error
}

func (r *UtilisateurRepository) FindById(ID int64) (*domain.Utilisateur, error) {
	var Utilisateur domain.Utilisateur
	result := r.db.Table("utilisateurs").First(&Utilisateur, ID)

	return &Utilisateur, result.Error
}

func (r *UtilisateurRepository) FindByEmailAndRole(email, role string) (*domain.Utilisateur, error) {
	var utilisateur domain.Utilisateur
	result := r.db.Table("utilisateurs").Where("email = ? and role = ?", email, role).First(&utilisateur)
	return &utilisateur, result.Error
}

func (r *UtilisateurRepository) FindByEmail(email string) (*domain.Utilisateur, error) {
	var utilisateur domain.Utilisateur
	result := r.db.Where("email = ?", email).First(&utilisateur)
	return &utilisateur, result.Error
}

func (r *UtilisateurRepository) FindAllById(ids []int64) ([]domain.Utilisateur, error) {
	users := []domain.Utilisateur{}

	result := r.db.Select("id", "email", "role").Find(&users, ids)
	return users, result.Error
}
