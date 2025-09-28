package PEIN.java.repository;

import PEIN.java.pojos.Classe;
import PEIN.java.pojos.Contenu;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.annotation.Resource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class ContenuRepository {

    public void addContenuToClasse(String classeId, Contenu nouveauContenu) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        File jsonFile = new ClassPathResource("classes.json").getFile();

        // 1. Lire le fichier entier en mémoire
        List<Classe> toutesLesClasses = mapper.readValue(jsonFile, new TypeReference<List<Classe>>() {});

        // 2. Trouver la classe par son ID
        Optional<Classe> optionalClasse = toutesLesClasses.stream()
                .filter(c -> c.getId().equals(classeId))
                .findFirst();

        if (optionalClasse.isPresent()) {
            Classe classeAModifier = optionalClasse.get();
            if (classeAModifier.getContenu_id() == null) {
                classeAModifier.setContenu_id(new ArrayList<>());
            }
            // 3. Ajouter le nouveau contenu à la liste
            classeAModifier.getContenu_id().add(nouveauContenu);

            // 4. Écrire la liste complète mise à jour dans le fichier
            mapper.writerWithDefaultPrettyPrinter().writeValue( jsonFile, toutesLesClasses);
        } else {
            throw new IllegalArgumentException("Classe avec l'ID " + classeId + " non trouvée.");
        }
    }
}
