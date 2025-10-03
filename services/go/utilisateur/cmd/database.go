package main

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func db(engine, dsn string) (*gorm.DB, error) {
	switch engine {
	case "postgres":
		return gorm.Open(postgres.Open(dsn))
	default:
		return nil, fmt.Errorf("engine not supported")
	}

}

type UserDB interface {
	findByEmailAndRole(email, role string) (*Utilisateur, error)
	findByEmail(email string) (*Utilisateur, error)
	findById(ID int) (*Utilisateur, error)
}

type JetonDB interface {
	find(valeur string, scope JetonScope) (*Jeton, error)
	create(jeton *Jeton) error
	update(jeton *Jeton) error
	invalidateForUserAndScope(userID int, scope JetonScope) error
}

type HistoriqueMotDePasseDB interface {
	getByUserID(utilisateurID string) ([]HistoriqueMotDePasse, error)
	create(historiqueMotDePasse *HistoriqueMotDePasse) error
}
