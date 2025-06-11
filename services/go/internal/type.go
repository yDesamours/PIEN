package internal

import (
	"bytes"
	"strconv"
)

type PrivateString string

func (s PrivateString) MarshalJSON() ([]byte, error) {
	return []byte{}, nil
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

func (u UpperCase) ToString() string {
	return string(u)
}
