package main

import (
	"PIEN/internal"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func createUsers(app *internal.App, repo *UtilisateurRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		user := &Utilisateur{}
		err := c.BindJSON(user)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		_, err = repo.findByEmail(user.Email)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.MotDePasse), 20)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		user.MotDePasse = internal.PrivateString(hashedPassword)

		repo.create(user)

		c.JSON(http.StatusCreated, user)

	}
}

func updateUser(app *internal.App, repo *UtilisateurRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		user := &Utilisateur{}
		err := c.BindJSON(user)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}
}

// func getUser(app *internal.App, repo *UtilisateurRepository) gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		userID := c.Param("id")
// 		user, err := repo.findById(userID)
// 		if err != nil {
// 			app.Error(err)
// 			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 			return
// 		}

// 		c.JSON(http.StatusOK, user)
// 	}
// }

func login(app *internal.App, userRepo *UtilisateurRepository, jetonRepo *JetonRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		type login struct {
			Email    string             `json:"email"`
			Password string             `json:"password"`
			Role     internal.UpperCase `json:"role"`
		}

		var credentials login
		err := c.BindJSON(&credentials)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		user, err := userRepo.findByEmailAndRole(credentials.Email, credentials.Role.ToString())
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err = bcrypt.CompareHashAndPassword([]byte(user.MotDePasse), []byte(credentials.Password))
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		sessionToken, err := app.Token.Random()

		err = jetonRepo.invalidateForUserAndScope(user.ID, JetonScopeId)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		jeton := Jeton{
			ipAdresse:     c.ClientIP(),
			UtilisateurID: user.ID,
			Valeur:        sessionToken,
			EmisLe:        time.Now(),
			EstRevoque:    false,
			Porte:         JetonScopeId,
		}

		err = jetonRepo.create(&jeton)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.SetCookie("session_token", sessionToken, 0, "", "", true, true)
		app.Success(c, http.StatusOK, user)

	}
}

func me(app *internal.App, userRepo *UtilisateurRepository, jetonRepo *JetonRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		sessionToken, err := c.Cookie(JetonScopeId.String())
		if err != nil || sessionToken == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}

		jeton, err := jetonRepo.find(sessionToken, JetonScopeId)
		if err != nil || jeton.EstRevoque {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid or expired session"})
			return
		}

		user, err := userRepo.findById(jeton.UtilisateurID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "user not found"})
			return
		}

		app.Success(c, http.StatusOK, user)
	}
}
