package internal

type PrivateString string

func (s PrivateString) MarshalJSON() ([]byte, error) {
	return []byte{}, nil
}
