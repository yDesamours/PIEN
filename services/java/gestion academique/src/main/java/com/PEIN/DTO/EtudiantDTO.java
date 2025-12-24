package com.PEIN.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EtudiantDTO {
    private Long id;
    private String matricule;
    private String nom;
    private String prenom;
}
