CREATE TYPE role_utilisateur AS ENUM ('eleve', 'enseignant', 'gestionnaire');

CREATE TABLE utilisateur (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255),
    role role_utilisateur NOT NULL,
    telephone VARCHAR(20),
    is_2fa_active BOOLEAN DEFAULT FALSE,
    statut VARCHAR(50),
    notifications_autorisees VARCHAR(100)[],
    cree_le TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cree_par VARCHAR(100)
);
