package com.PEIN.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "classe_eleves",schema = "sga")
public class ClasseEleves {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "eleve_id", nullable = false)
    private Etudiant eleve_id;
    private LocalDateTime creeLe;
    private LocalDateTime modifieLe;
    private LocalDateTime supprimeLe;

    @ManyToOne
    @JoinColumn(name = "classe_id", nullable = false)
    private Classe classe_id;
}
