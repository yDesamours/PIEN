package domain

import "time"

type HistoriqueMotDePasse struct {
	ID            int
	UtilisateurID string
	MotDePasse    string
	ChangeLe      time.Time
}
