package internal

type CachedFile interface {
	GetContent() any
}

type inMemoryCachedFile struct {
	content any
}

func (c inMemoryCachedFile) GetContent() any {
	return c.content
}

type CacheService interface {
	Get(string) (CachedFile, bool)
	Put(string, interface{}) bool
}

type InMemoryCache struct {
	values map[string]interface{}
}

var defaultCache = InMemoryCache{values: make(map[string]interface{})}

func (c *InMemoryCache) Get(key string) (CachedFile, bool) {
	content, ok := c.values[key]
	return inMemoryCachedFile{content: content}, ok
}

func (c *InMemoryCache) Put(key string, value interface{}) bool {
	c.values[key] = value
	return true
}

func DefaultCacheService() CacheService {
	return &defaultCache
}
