CREATE TABLE multimedia_file (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    path TEXT NOT NULL,
    filename TEXT NOT NULL,
    type TEXT NOT NULL,
    cree_le TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cree_par INT
);
