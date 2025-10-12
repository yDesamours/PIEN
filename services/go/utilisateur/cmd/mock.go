package main

import (
	"encoding/json"
	"fmt"
	"os"
	"sync"
	"time"
)

// UserFileDB est une implémentation de UserDB utilisant un fichier JSON.
type UserFileDB struct {
	filePath string
	mutex    sync.Mutex
}

// NewUserFileDB crée une nouvelle instance de UserFileDB.
func NewUserFileDB(filePath string) *UserFileDB {
	// Créer le fichier s'il n'existe pas.
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		os.WriteFile(filePath, []byte("[]"), 0644)
	}
	return &UserFileDB{filePath: filePath}
}

// readUsers lit les utilisateurs depuis le fichier.
func (db *UserFileDB) readUsers() ([]Utilisateur, error) {
	data, err := os.ReadFile(db.filePath)
	if err != nil {
		return nil, err
	}
	var users []Utilisateur
	if err := json.Unmarshal(data, &users); err != nil {
		return nil, err
	}
	return users, nil
}

// findByEmailAndRole recherche un utilisateur par email et rôle.
func (db *UserFileDB) findByEmailAndRole(email, role string) (*Utilisateur, error) {
	db.mutex.Lock()
	defer db.mutex.Unlock()

	users, err := db.readUsers()
	if err != nil {
		return nil, err
	}
	for _, user := range users {
		if user.Email == email && user.Role == role {
			return &user, nil
		}
	}
	return nil, fmt.Errorf("user not found") // Renvoie nil, nil si non trouvé
}

// findByEmail recherche un utilisateur par email.
func (db *UserFileDB) findByEmail(email string) (*Utilisateur, error) {
	db.mutex.Lock()
	defer db.mutex.Unlock()

	users, err := db.readUsers()
	if err != nil {
		return nil, err
	}
	for _, user := range users {
		if user.Email == email {
			return &user, nil
		}
	}
	return nil, nil
}

// findById recherche un utilisateur par ID.
func (db *UserFileDB) findById(ID int) (*Utilisateur, error) {
	db.mutex.Lock()
	defer db.mutex.Unlock()

	users, err := db.readUsers()
	if err != nil {
		return nil, err
	}
	for _, user := range users {
		if user.ID == ID {
			return &user, nil
		}
	}
	return nil, nil
}

// JetonFileDB est une implémentation de JetonDB.
type JetonFileDB struct {
	filePath string
	mutex    sync.Mutex
}

// NewJetonFileDB crée une nouvelle instance.
func NewJetonFileDB(filePath string) *JetonFileDB {
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		os.WriteFile(filePath, []byte("[]"), 0644)
	}
	return &JetonFileDB{filePath: filePath}
}

// readJetons lit les jetons depuis le fichier.
func (db *JetonFileDB) readJetons() ([]Jeton, error) {
	data, err := os.ReadFile(db.filePath)
	if err != nil {
		return nil, err
	}
	var jetons []Jeton
	if err := json.Unmarshal(data, &jetons); err != nil {
		return nil, err
	}
	return jetons, nil
}

// writeJetons écrit les jetons dans le fichier.
func (db *JetonFileDB) writeJetons(jetons []Jeton) error {
	data, err := json.MarshalIndent(jetons, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(db.filePath, data, 0644)
}

// find recherche un jeton par valeur et scope.
func (db *JetonFileDB) find(valeur string, scope JetonScope) (*Jeton, error) {
	db.mutex.Lock()
	defer db.mutex.Unlock()

	jetons, err := db.readJetons()
	if err != nil {
		return nil, err
	}
	for _, jeton := range jetons {
		if jeton.Valeur == valeur && jeton.Porte == scope && !jeton.EstRevoque && jeton.ExpireLe.After(time.Now()) {
			return &jeton, nil
		}
	}
	return nil, nil
}

// create ajoute un nouveau jeton.
func (db *JetonFileDB) create(jeton *Jeton) error {
	db.mutex.Lock()
	defer db.mutex.Unlock()

	jetons, err := db.readJetons()
	if err != nil {
		return err
	}
	jeton.ID = len(jetons) + 1 // Assigner un ID simple
	jetons = append(jetons, *jeton)
	return db.writeJetons(jetons)
}

// update met à jour un jeton.
func (db *JetonFileDB) update(jeton *Jeton) error {
	db.mutex.Lock()
	defer db.mutex.Unlock()

	jetons, err := db.readJetons()
	if err != nil {
		return err
	}
	for i, j := range jetons {
		if j.ID == jeton.ID {
			jetons[i] = *jeton
			return db.writeJetons(jetons)
		}
	}
	return nil // Jeton non trouvé, pas d'erreur.
}

// invalidateForUserAndScope invalide les jetons pour un utilisateur et un scope donnés.
func (db *JetonFileDB) invalidateForUserAndScope(userID int, scope JetonScope) error {
	db.mutex.Lock()
	defer db.mutex.Unlock()

	jetons, err := db.readJetons()
	if err != nil {
		return err
	}
	for i := range jetons {
		if jetons[i].UtilisateurID == userID && jetons[i].Porte == scope {
			jetons[i].EstRevoque = true
		}
	}
	return db.writeJetons(jetons)
}

// HistoriqueMotDePasseFileDB est une implémentation de HistoriqueMotDePasseDB.
type HistoriqueMotDePasseFileDB struct {
	filePath string
	mutex    sync.Mutex
}

// NewHistoriqueMotDePasseFileDB crée une nouvelle instance.
func NewHistoriqueMotDePasseFileDB(filePath string) *HistoriqueMotDePasseFileDB {
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		os.WriteFile(filePath, []byte("[]"), 0644)
	}
	return &HistoriqueMotDePasseFileDB{filePath: filePath}
}

// readHistorique lit l'historique depuis le fichier.
func (db *HistoriqueMotDePasseFileDB) readHistorique() ([]HistoriqueMotDePasse, error) {
	data, err := os.ReadFile(db.filePath)
	if err != nil {
		return nil, err
	}
	var historique []HistoriqueMotDePasse
	if err := json.Unmarshal(data, &historique); err != nil {
		return nil, err
	}
	return historique, nil
}

// writeHistorique écrit l'historique dans le fichier.
func (db *HistoriqueMotDePasseFileDB) writeHistorique(historique []HistoriqueMotDePasse) error {
	data, err := json.MarshalIndent(historique, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(db.filePath, data, 0644)
}

// getByUserID récupère l'historique des mots de passe d'un utilisateur.
func (db *HistoriqueMotDePasseFileDB) getByUserID(utilisateurID string) ([]HistoriqueMotDePasse, error) {
	db.mutex.Lock()
	defer db.mutex.Unlock()

	historique, err := db.readHistorique()
	if err != nil {
		return nil, err
	}
	var userHistory []HistoriqueMotDePasse
	for _, h := range historique {
		if h.UtilisateurID == utilisateurID {
			userHistory = append(userHistory, h)
		}
	}
	return userHistory, nil
}

// create ajoute une nouvelle entrée à l'historique.
func (db *HistoriqueMotDePasseFileDB) create(historiqueMotDePasse *HistoriqueMotDePasse) error {
	db.mutex.Lock()
	defer db.mutex.Unlock()

	historique, err := db.readHistorique()
	if err != nil {
		// Gérer l'erreur, par exemple, journaliser ou paniquer.
		return err
	}
	historiqueMotDePasse.ID = len(historique) + 1
	historique = append(historique, *historiqueMotDePasse)
	db.writeHistorique(historique)
	return nil
}
