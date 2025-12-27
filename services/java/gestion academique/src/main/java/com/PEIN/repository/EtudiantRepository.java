package com.PEIN.repository;

import com.PEIN.entity.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
}
