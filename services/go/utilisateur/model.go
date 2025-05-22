package main

import (
	"time"

	"gorm.io/gorm"
)

type Utilisateur struct {
	ID                      string `gorm:"primaryKey"`
	Email                   string
	MotDePasse              string
	Role                    string
	Telephone               string
	is2FaActive             string
	Statut                  string
	NotificationsAutorisees []string
	CreeLe                  time.Time
	CreePar                 string
}

type UtilisateurRepository struct {
	db *gorm.DB
}

func newUtilisateurRepository(db *gorm.DB) *UtilisateurRepository {
	return &UtilisateurRepository{db}
}

func (r *UtilisateurRepository) create(u *Utilisateur) error {
	result := r.db.Create(u)
	return result.Error

}

func (r *UtilisateurRepository) update(u *Utilisateur) error {
	result := r.db.Save(u)
	return result.Error
}

func (r *UtilisateurRepository) findById(ID string) (*Utilisateur, error) {
	var Utilisateur Utilisateur
	result := r.db.First(&Utilisateur, ID)

	return &Utilisateur, result.Error
}

func (r *UtilisateurRepository) findByEmailAndRole(email, role string) (*Utilisateur, error) {
	var utilisateur Utilisateur
	result := r.db.Where("email = ? and role = ?", email, role).First(&utilisateur)
	return &utilisateur, result.Error
}

func (r *UtilisateurRepository) findByEmail(email string) (*Utilisateur, error) {
	var utilisateur Utilisateur
	result := r.db.Where("email = ?", email).First(&utilisateur)
	return &utilisateur, result.Error
}

type Jeton struct {
	ID            string
	UtilisateurID string
	Valeur        string
	Scope         string
	EmisLe        time.Time
	ExpireLe      time.Time
	EstRevoque    bool
	ipAdresse     string
	userAgent     string
}

type JetonRepository struct {
	db *gorm.DB
}

func (repository *JetonRepository) create(jeton *Jeton) error {
	result := repository.db.Create(jeton)
	return result.Error
}

func (repository *JetonRepository) update(jeton *Jeton) error {
	result := repository.db.Save(jeton)
	return result.Error
}

type HistoriqueMotDePasse struct {
	ID            int
	UtilisateurID string
	MotDePasse    string
	ChangeLe      time.Time
}

type HistoriqueMotDePasseRepository struct {
	db *gorm.DB
}

func (r *HistoriqueMotDePasseRepository) create(historiqueMotDePasse *HistoriqueMotDePasse) error {
	result := r.db.Create(historiqueMotDePasse)
	return result.Error
}

func (r *HistoriqueMotDePasseRepository) getByUserID(utilisateurID string) ([]HistoriqueMotDePasse, error) {
	var historiques []HistoriqueMotDePasse
	result := r.db.Where("utilisateur_id = ?", utilisateurID).Find(&historiques)
	return historiques, result.Error
}
