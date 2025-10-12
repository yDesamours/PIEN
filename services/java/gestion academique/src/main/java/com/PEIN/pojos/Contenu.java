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
public class Contenu {
    private String id;
    private String titre;
    private String objectif;
    private String type;
    private int duree_lecture;
    private String url_telechargement;
    private int nb_telechargement;
    private String poste_le;
    private String supprime_le;
    private List<Question> question;
}
