package domain

type GlbModel struct {
	ID           int      `json:"id"`
	Name         string   `json:"name"`
	Description  string   `json:"description"`
	ThumbnailUrl string   `json:"thumbnailUrl"`
	Url          string   `json:"url"`
	Categorie    string   `json:"categorie"`
	Tags         []string `json:"tags"`
}
