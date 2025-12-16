package repository

import "PIEN/utilisateur/domain"

type UserDB interface {
	FindByEmailAndRole(email, role string) (*domain.Utilisateur, error)
	FindByEmail(email string) (*domain.Utilisateur, error)
	FindById(ID int64) (*domain.Utilisateur, error)
	FindAllById(ids []int64) ([]domain.Utilisateur, error)
}

type JetonDB interface {
	Find(valeur string, scope domain.JetonScope) (*domain.Jeton, error)
	Create(jeton *domain.Jeton) error
	Update(jeton *domain.Jeton) error
	InvalidateForUserAndScope(userID int64, scope domain.JetonScope) error
}

type HistoriqueMotDePasseDB interface {
	GetByUserID(utilisateurID string) ([]domain.HistoriqueMotDePasse, error)
	Create(historiqueMotDePasse *domain.HistoriqueMotDePasse) error
}
