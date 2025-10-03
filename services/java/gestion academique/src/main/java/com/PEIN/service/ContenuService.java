package com.PEIN.service;

import org.springframework.stereotype.Service;

import com.PEIN.pojos.Contenu;
import com.PEIN.repository.ContenuRepository;

import java.io.IOException;
import java.util.UUID;

@Service
public class ContenuService {

    private final ContenuRepository contenuRepository;

    public ContenuService(ContenuRepository contenuRepository) {
        this.contenuRepository = contenuRepository;
    }

    public void add(String classeId, Contenu contenu) throws IOException {
        // Logique métier : Valider les données et générer un ID unique
        if (contenu.getId() == null || contenu.getId().isEmpty()) {
            contenu.setId(UUID.randomUUID().toString());
        }

        try {
            contenuRepository.addContenuToClasse(classeId, contenu);
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de la sauvegarde du contenu", e);
        }
    }
}
