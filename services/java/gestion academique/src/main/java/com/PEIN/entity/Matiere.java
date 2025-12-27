package com.PEIN.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "matiere",schema = "sga")
public class Matiere {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long code;

    private String nom;
    private Long responsableId;

    private LocalDateTime creeLe;

    @Column(columnDefinition = "bigint[]")
    private List<Long> enseignants;

    private LocalDateTime modifieLe;
    private LocalDateTime supprimeLe;

    @OneToMany(mappedBy = "matiereId")
    private List<Classe> classes;
}
