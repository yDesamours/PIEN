package internal

import (
	"fmt"

	"github.com/golang-jwt/jwt"
)

type ClaimBuilder struct {
	claims map[string]interface{}
	built  bool
}

func newClaimBuilder() *ClaimBuilder {
	return &ClaimBuilder{
		claims: map[string]interface{}{},
	}
}

func (builder *ClaimBuilder) add(key string, value interface{}) error {
	if builder.built {
		return fmt.Errorf("Cannot add claims after build")
	}
	builder.claims[key] = value
	return nil
}

func (build *ClaimBuilder) build() (jwt.MapClaims, error) {
	if build.built {
		return nil, fmt.Errorf("Cannot build twice")
	}

	build.built = true
	copy := make(map[string]interface{})
	for k, v := range build.claims {
		copy[k] = v
	}

	return copy, nil
}

func Token(claims jwt.MapClaims, secret string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(secret)
}
