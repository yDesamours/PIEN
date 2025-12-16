package com.PEIN.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassRequestDTO {
    private Long echelonId;
        private Long matiereId;
        private Long enseignantId;
        private String code;
        private String nom;
        private String description;
        private String anneeAcademique;
}
