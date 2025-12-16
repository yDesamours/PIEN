package com.PEIN.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "classe", schema = "sga")
public class Classe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String nom;

    @Column(columnDefinition = "TEXT")
    private String description;
    private Long enseignant;
    private Boolean actif;
    private String anneeAcademique;

    private LocalDateTime creeLe;
    private LocalDateTime supprimeLe;

    @ManyToOne
    @JoinColumn(name = "echelon_id", nullable = false)
    @JsonIgnore
    private Echelon echelon;

    @Column(name = "echelon_id", insertable = false, updatable = false)
    private Long echelonId;
    @ManyToOne
    @JoinColumn(name = "matiere_id")
    @JsonIgnore
    private Matiere matiere;

    @Column(name = "matiere_id", insertable = false, updatable = false)
    private Long matiereId;

    @OneToMany(mappedBy = "classe_id", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ClasseEleves> classeEleves;
}
