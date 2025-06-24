package internal

import (
	"bytes"
	"fmt"
	"strconv"
)

type PrivateString string

func (s PrivateString) MarshalJSON() ([]byte, error) {
	return []byte(strconv.Quote("")), nil
}

type UpperCase string

func (u *UpperCase) UnmarshalJSON(b []byte) (e error) {
	upper := (string)(bytes.ToUpper(b))
	upper, e = strconv.Unquote(upper)
	if e != nil {
		return e
	}
	*u = UpperCase(upper)
	return nil
}

type ResponseStatus int

const (
	StatusSucces = iota
	StatusError
)

func (r ResponseStatus) MarshalJSON() ([]byte, error) {
	switch r {
	case 0:
		return []byte(strconv.Quote("success")), nil
	case 1:
		return []byte(strconv.Quote("error")), nil
	default:
		return nil, fmt.Errorf("code de status non reconnu")
	}
}

func (u UpperCase) ToString() string {
	return string(u)
}

type SuccessResponse struct {
	Status  ResponseStatus `json:"status"`
	Data    interface{}    `json:"data"`
	Message string         `json:"message"`
}

type ErrorResponse struct {
	Status ResponseStatus `json:"status"`
	Error  struct {
		Code    int    `json:"code"`
		Type    string `json:"type"`
		Message string `json:"message"`
	}
}
