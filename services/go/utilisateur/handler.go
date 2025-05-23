package main

import (
	"PIEN/internal"
	"net/http"

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

func getUser(app *internal.App, repo *UtilisateurRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.Param("id")
		user, err := repo.findById(userID)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, user)
	}
}

func login(app *internal.App, repo *UtilisateurRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		type login struct {
			Email    string `json:"email"`
			Password string `json:"password"`
			Role     string `json:"role"`
		}

		var credentials login
		err := c.BindJSON(&credentials)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		user, err := repo.findByEmailAndRole(credentials.Email, credentials.Role)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err = bcrypt.CompareHashAndPassword([]byte(credentials.Password), []byte(user.MotDePasse))
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, user)
	}
}
