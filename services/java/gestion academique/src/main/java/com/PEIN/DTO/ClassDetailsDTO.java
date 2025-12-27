package com.PEIN.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassDetailsDTO {
    private Long id;
    private String code;
    private String nom;
    private String echelon;
    private String matiere;
    private String programme;
    private String enseignant;
}
