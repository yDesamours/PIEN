package com.PEIN.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "echelon",schema = "sga")
public class Echelon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private LocalDateTime creeLe;
    private LocalDateTime supprimeLe;

    @ManyToOne
    @JoinColumn(name = "programme_id", nullable = false)
    @JsonIgnore
    private Programme programme;

    @Column(name = "programme_id", insertable = false, updatable = false)
    private Long programmeId;

    @OneToMany(mappedBy = "echelonId", cascade = CascadeType.ALL)
    private List<Classe> classes;
}

