package domain

import (
	"PIEN/internal"
	"time"

	"github.com/lib/pq"
)

type Utilisateur struct {
	ID                      int64                  `gorm:"primaryKey" json:"id"`
	Email                   string                 `json:"email"`
	MotDePasse              internal.PrivateString `json:"motDePasse,omitempty"`
	Role                    string                 `json:"role"`
	Telephone               string                 `json:"telephone"`
	Is2FaActive             string                 `json:"is2FaActive"`
	Statut                  string                 `json:"statut"`
	NotificationsAutorisees pq.StringArray         `gorm:"type:varchar[]" json:"notificationsAutorisees"`
	CreeLe                  time.Time              `json:"creeLe"`
	CreePar                 string                 `json:"creePar"`
}
