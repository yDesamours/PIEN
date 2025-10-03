package com.PEIN.pojos;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Classe {
    private String id;
    private String cours_id;
    private String enseignant_id;
    private String annee_academique;
    private String groupe;
    private String status;
    private String modifie_le;
    private String cree_le;
    private String supprime_le;
    private String niveau;
    private String nom;
    private String matiere;
    private int nombreEleves;
    private int nombreModules;
}
