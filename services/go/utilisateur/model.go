package main

import (
	"PIEN/internal"
	"fmt"
	"time"

	"gorm.io/gorm"
)

type Utilisateur struct {
	ID                      int                    `gorm:"primaryKey" json:"id"`
	Email                   string                 `json:"email"`
	MotDePasse              internal.PrivateString `json:"motDePasse,omitempty"`
	Role                    string                 `json:"role"`
	Telephone               string                 `json:"telephone"`
	Is2FaActive             string                 `json:"is2FaActive"`
	Statut                  string                 `json:"statut"`
	NotificationsAutorisees []string               `json:"notificationsAutorisees"`
	CreeLe                  time.Time              `json:"creeLe"`
	CreePar                 string                 `json:"creePar"`
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

func (r *UtilisateurRepository) findById(ID int) (*Utilisateur, error) {
	var Utilisateur Utilisateur
	result := r.db.Table("utilisateurs").First(&Utilisateur, ID)

	return &Utilisateur, result.Error
}

func (r *UtilisateurRepository) findByEmailAndRole(email, role string) (*Utilisateur, error) {
	var utilisateur Utilisateur
	result := r.db.Table("utilisateurs").Where("email = ? and role = ?", email, role).First(&utilisateur)
	return &utilisateur, result.Error
}

func (r *UtilisateurRepository) findByEmail(email string) (*Utilisateur, error) {
	var utilisateur Utilisateur
	result := r.db.Where("email = ?", email).First(&utilisateur)
	return &utilisateur, result.Error
}

type Jeton struct {
	ID            int `gorm:"-, primaryKey"`
	UtilisateurID int
	Valeur        string
	Porte         JetonScope
	EmisLe        time.Time
	ExpireLe      time.Time
	EstRevoque    bool
	ipAdresse     string
	userAgent     string
}

type JetonRepository struct {
	db *gorm.DB
}

func newJetonRepository(db *gorm.DB) *JetonRepository {
	return &JetonRepository{db}
}

func (repository *JetonRepository) find(valeur string, scope JetonScope) (*Jeton, error) {
	var jeton Jeton
	result := repository.db.Table("jetons").Where(&Jeton{Valeur: valeur, Porte: scope}).First(&jeton)
	return &jeton, result.Error
}

func (repository *JetonRepository) create(jeton *Jeton) error {
	result := repository.db.Table("jetons").Save(jeton)
	return result.Error
}

func (repository *JetonRepository) update(jeton *Jeton) error {
	result := repository.db.Save(jeton)
	return result.Error
}

func (repository *JetonRepository) invalidateForUserAndScope(userID int, scope JetonScope) error {
	result := repository.db.Table("jetons").Where(&Jeton{UtilisateurID: userID, Porte: scope}).Update("est_revoque", true)
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

type JetonScope int

const (
	JetonScope2FA JetonScope = iota
	JetonScopeResetPassword
	JetonScopeId
)

func (s JetonScope) String() string {
	switch s {
	case JetonScope2FA:
		return "2fa"
	case JetonScopeResetPassword:
		return "reset_password"
	case JetonScopeId:
		return "session_id"
	default:
		return "unknown"
	}
}

func (s *JetonScope) Scan(value interface{}) error {
	str, ok := value.(string)
	if !ok {
		return fmt.Errorf("cannot convert")
	}

	switch str {
	case "2fa":
		*s = JetonScope2FA
	case "reset_password":
		*s = JetonScopeResetPassword
	case "session_id":
		*s = JetonScopeId
	default:
		return nil
	}
	return nil
}

func (s JetonScope) Value() (string, error) {
	return s.String(), nil
}
