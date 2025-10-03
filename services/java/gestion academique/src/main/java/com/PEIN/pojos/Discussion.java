package com.PEIN.pojos;

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
public class Discussion {
    private String id;
    private String sujet;
    private String contenu;
    private String status;
    private String poste_le;
    private String auteur;
    private List<Reponse> reponse;
}
