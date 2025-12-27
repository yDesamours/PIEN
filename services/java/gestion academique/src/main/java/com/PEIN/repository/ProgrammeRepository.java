package com.PEIN.repository;

import com.PEIN.entity.Programme;
import com.PEIN.projection.LovProjection;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProgrammeRepository extends JpaRepository<Programme,Long> {
    @Query("""
        SELECT p.id AS code, p.code||'-'||p.nom AS nom,p.id as Id
        FROM Programme p
        WHERE p.actif = true
    """)
    List<LovProjection> findLov();
}
