package PEIN.java.service;

import PEIN.java.pojos.Contenu;
import PEIN.java.repository.ContenuRepository;
import org.springframework.stereotype.Service;

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
