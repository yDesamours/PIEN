package main

import "gorm.io/gorm"

type Utilisateur struct {
	ID         string
	Nom        string
	Prenom     string
	Email      string
	MotDePasse string
	Role       string
}

type UtilisateurRepository struct {
	db *gorm.DB
}

func newUtilisateurRepository(db *gorm.DB) *UtilisateurRepository {
	return &UtilisateurRepository{db}
}

func (r *UtilisateurRepository) create(u *Utilisateur) {
	r.db.Create(u)

}

func (r *UtilisateurRepository) update(u *Utilisateur) {
	r.db.Save(u)
}

func (r *UtilisateurRepository) findById(ID string) *Utilisateur {
	var Utilisateur Utilisateur
	r.db.First(&Utilisateur, ID)

	return &Utilisateur
}
