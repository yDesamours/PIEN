package com.PEIN.pojos;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Matiere {
    private Long code; // PK auto-généré (on pourra simuler en mémoire)
    private String nom;
    private Long responsableId;
    private LocalDateTime creeLe;
    private LocalDateTime modifieLe;
    private LocalDateTime supprimeLe;
}
