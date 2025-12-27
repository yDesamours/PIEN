package com.PEIN.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="etudiant", schema="sga")
public class Etudiant {
    @Id
    private Long id;
     private String matricule;
     private String nom;
     private String prenom;
     private String email;
     private Boolean actif;
     private LocalDateTime cree_le;
     private LocalDateTime modifie_le;
     private LocalDateTime supprime_le;

}
