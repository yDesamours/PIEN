package com.PEIN.repository;

import com.PEIN.pojos.Classe;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ClasseRepository {

    private final List<Classe> classes;

    public ClasseRepository() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Resource resource = new ClassPathResource("classes.json");
        try (InputStream inputStream = resource.getInputStream()) {
            this.classes = mapper.readValue(inputStream, new TypeReference<List<Classe>>() {
            });
        }
    }

    public List<Classe> findAll() {
        return classes;
    }

    public List<Classe> findByEnseignantId(String enseignantId) {
        return classes.stream()
                .filter(classe -> classe.getEnseignant_id().equals(enseignantId))
                .collect(Collectors.toList());
    }
}
