package com.PEIN.repository;

import com.PEIN.entity.Classe;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.Id;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;


@Repository
public interface ClasseRepository extends JpaRepository<Classe,Long> {

 List<Classe> findByEnseignant(Long enseignantId);
 List<Classe> findByEnseignantAndSupprimeLeIsNull(Long enseignant);
}

