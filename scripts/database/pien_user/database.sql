CREATE TYPE role_utilisateur AS ENUM ('eleve', 'enseignant', 'gestionnaire');

CREATE TABLE utilisateurs (
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

CREATE TYPE jeton_scope AS ENUM ('2fa', 'session_id', 'reset_password'); 

CREATE TABLE jetons (
    id SERIAL PRIMARY KEY,
    utilisateur_id INTEGER NOT NULL,
    valeur VARCHAR(255) NOT NULL,
    porte jeton_scope NOT NULL,
    emis_le TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expire_le TIMESTAMP NOT NULL,
    est_revoque BOOLEAN NOT NULL DEFAULT FALSE,
    ip_adresse VARCHAR(45),      
    user_agent VARCHAR(255)
);
