package internal

import (
	"crypto/rand"
	"fmt"
	"math"
	"math/big"
	"time"

	"github.com/golang-jwt/jwt"
)

type jwtBuilder struct {
	claims jwt.MapClaims

	built bool
}

func newClaimBuilder() *jwtBuilder {
	return &jwtBuilder{
		claims: map[string]interface{}{},
	}
}

func (builder *jwtBuilder) Claim(key string, value interface{}) error {
	if builder.built {
		return fmt.Errorf("Cannot add claims after build")
	}
	builder.claims[key] = value
	return nil
}

func (build *jwtBuilder) build(method *jwt.SigningMethodHMAC, secret string) (string, error) {
	if build.built {
		return "", fmt.Errorf("Cannot build twice")
	}

	build.Claim("exp", time.Now().Add(time.Minute*5).Unix())
	build.Claim("iat", (time.Now().Unix()))

	build.built = true

	token := jwt.NewWithClaims(method, build.claims)
	return token.SignedString(([]byte)(secret))

}

type Token struct {
	jwtSecret string
}

func New(secret string) *Token {
	return &Token{jwtSecret: secret}
}

func (t *Token) JwtBuilder() *jwtBuilder {
	return newClaimBuilder()
}

func (t *Token) BuildJWT(b *jwtBuilder) (string, error) {
	return b.build(jwt.SigningMethodHS256, t.jwtSecret)
}

func (t *Token) Otp(digits int) (string, error) {
	min := (int64)(math.Pow10(digits - 1))
	max := min * 10
	nBig, err := rand.Int(rand.Reader, big.NewInt(max-min))
	if err != nil {
		return "", err
	}

	n := nBig.Int64() + min
	return fmt.Sprintf("%d", n), nil
}

func (t *Token) Random() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	return fmt.Sprintf("%x", b), err
}
