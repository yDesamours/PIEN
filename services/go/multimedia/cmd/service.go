package main

import (
	"os"
	"path/filepath"

	"github.com/spf13/viper"
)

type fileStorage interface {
	save([]byte) (string, error)
	open(string) ([]byte, error)
}

type localFileStorage struct {
	resourcesPath string
}

func (s *localFileStorage) save(content []byte) (string, error) {
	return "", nil
}

func (s *localFileStorage) open(path string) ([]byte, error) {
	resourcePath := filepath.FromSlash(filepath.Join(s.resourcesPath, path))

	return os.ReadFile(resourcePath)
}

func newFileStorage() fileStorage {
	return &localFileStorage{
		resourcesPath: viper.GetString("resources.path"),
	}
}
