package com.PEIN.repository;

import com.PEIN.entity.Echelon;
import com.PEIN.projection.LovProjection;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EchelonRepository extends JpaRepository<Echelon,Long> {
    @Query("""
        SELECT e.id AS code, e.nom AS nom
        FROM Echelon e
        WHERE e.programme.id = :programmeId
        AND e.supprimeLe IS NULL
    """)
    List<LovProjection> findLovByProgramme(@Param("programmeId") Long programmeId);
}
