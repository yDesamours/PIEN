package domain

import (
	"fmt"
	"time"
)

type Jeton struct {
	ID            int64 `gorm:"-, primaryKey"`
	UtilisateurID int64
	Valeur        string
	Porte         JetonScope
	EmisLe        time.Time
	ExpireLe      time.Time
	EstRevoque    bool
	IpAdresse     string
	UserAgent     string
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
