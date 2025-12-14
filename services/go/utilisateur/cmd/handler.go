package main

import (
	"PIEN/internal"
	"PIEN/utilisateur/domain"
	"PIEN/utilisateur/repository"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func createUsers(app *App, repo *repository.UtilisateurRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		user := &domain.Utilisateur{}
		err := c.BindJSON(user)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		_, err = repo.FindByEmail(user.Email)
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

		repo.Create(user)

		c.JSON(http.StatusCreated, user)

	}
}

func updateUser(app *App, repo *repository.UtilisateurRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		user := &domain.Utilisateur{}
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

func login(app *App) gin.HandlerFunc {
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
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		user, err := app.UserModel.FindByEmailAndRole(credentials.Email, credentials.Role)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusNotFound, gin.H{"message": "email ou mot de passe incorrect"})
			return
		}

		err = bcrypt.CompareHashAndPassword([]byte(user.MotDePasse), []byte(credentials.Password))
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusNotFound, gin.H{"message": "email ou mot de passe incorrect"})
			return
		}

		sessionToken, err := app.Token.Random()

		err = app.JetonModel.InvalidateForUserAndScope(user.ID, domain.JetonScopeId)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		jeton := domain.Jeton{
			IpAdresse:     c.ClientIP(),
			UtilisateurID: user.ID,
			Valeur:        sessionToken,
			EmisLe:        time.Now(),
			EstRevoque:    false,
			Porte:         domain.JetonScopeId,
		}

		err = app.JetonModel.Create(&jeton)
		if err != nil {
			app.Error(err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		c.SetCookie("session_token", sessionToken, 0, "", "", true, true)
		app.Success(c, http.StatusOK, user)

	}
}

func whoAre(app *App) gin.HandlerFunc {
	return func(c *gin.Context) {
		type bulkCollectUser struct {
			ids []int64
		}

		var request bulkCollectUser

		err := c.BindJSON(&request)
		if err != nil {
			return
		}

		result, err := app.UserModel.FindAllById(request.ids)
		if err != nil {
			return
		}

		app.Success(c, http.StatusOK, result)
	}
}

func me(app *App) gin.HandlerFunc {
	return func(c *gin.Context) {
		sessionToken, err := c.Cookie(domain.JetonScopeId.String())
		if err != nil || sessionToken == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}

		jeton, err := app.JetonModel.Find(sessionToken, domain.JetonScopeId)
		if err != nil || jeton.EstRevoque {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid or expired session"})
			return
		}

		user, err := app.UserModel.FindById(jeton.UtilisateurID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "user not found"})
			return
		}

		app.Success(c, http.StatusOK, user)
	}
}
