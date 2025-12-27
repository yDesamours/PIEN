package com.PEIN.repository;

import com.PEIN.DTO.ClassDetailsDTO;
import com.PEIN.entity.Classe;
import com.PEIN.projection.LovProjection;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.Id;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;


@Repository
public interface ClasseRepository extends JpaRepository<Classe,Long> {
//private ClassDetailsDTO classedetailsDTO;
 List<Classe> findByEnseignant(Long enseignantId);
 List<Classe> findByEnseignantAndSupprimeLeIsNull(Long enseignant);
 @Query(value = """
        SELECT
            e.id as code,
            CONCAT(e.matricule,' - ',e.nom, ' ', e.prenom) AS nom
        FROM sga.matiere m
        JOIN UNNEST(m.enseignants) AS ens_id ON TRUE
        JOIN sga.enseignant e ON e.id = ens_id
        WHERE m.code = :matiereId
          AND m.supprime_le IS NULL
          AND e.supprime_le IS NULL;
        """, nativeQuery = true)
 List<LovProjection> findEnseignantsLovByMatiere(@Param("matiereId") Long matiereId);

 @Query(value = """
 SELECT c.id,
     c.code, c.nom ,
     e.nom AS echelon,
     m.nom AS matiere,
     p.nom AS programme,
     CONCAT(en.matricule, '-', en.nom, ' ', en.prenom) AS enseignant
  from sga.classe c join sga.echelon e on(c.echelon_id=e.id)
  join sga.matiere m on (m.code=c.matiere_id)
  join sga.programme p on (p.id=e.programme_id)
  join sga.enseignant en on (c.enseignant = en.id)
 """, nativeQuery = true)
 List<ClassDetailsDTO> findAllClasseCreated();
 void deleteClasseById(Long Id);
}



