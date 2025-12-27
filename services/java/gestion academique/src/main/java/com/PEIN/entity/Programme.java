package com.PEIN.entity;

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
@Table(name = "programme",schema = "sga")
public class Programme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String nom;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer dureeMois;
    private Boolean actif;

    private LocalDateTime creeLe;
    private LocalDateTime modifieLe;


}

