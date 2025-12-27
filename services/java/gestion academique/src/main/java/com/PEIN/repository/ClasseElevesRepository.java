package com.PEIN.repository;

import com.PEIN.DTO.EtudiantDTO;
import com.PEIN.entity.ClasseEleves;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClasseElevesRepository extends JpaRepository<ClasseEleves, Long> {
    @Query( value="""
              select e.id,matricule ,nom,prenom  
              from  sga.classe_eleves ce join sga.etudiant e  on(ce.eleve_id=e.id) 
              where classe_id=:classe_id and actif=true;
            """,nativeQuery = true
    )
    List<EtudiantDTO> findStudentOfAClasse (Long classe_id);

    @Query( value="""
SELECT e.id,e.matricule,
       e.nom,
       e.prenom
FROM sga.etudiant e
LEFT JOIN sga.classe_eleves ce
       ON ce.eleve_id = e.id
      AND ce.classe_id = :classe_id
WHERE e.actif = true
  AND ce.eleve_id IS NULL;
 
            """,nativeQuery = true
    )
    List <EtudiantDTO> findAllStudent(Long classe_id);

    Optional<ClasseEleves> findClasseElevesByClasseIdAndEleveId(Long classeId, Long eleveId);
    void deleteClasseElevesByClasseIdAndEleveId(Long classeId, Long eleveId);
}
