package com.PEIN.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.PEIN.Response;
import com.PEIN.pojos.Classe;
import com.PEIN.pojos.Contenu;
import com.PEIN.service.ClasseService;
import com.PEIN.service.ContenuService;

import java.util.List;

@RestController
@RequestMapping("/classes")
@RequiredArgsConstructor
public class ClasseController {
    private final ClasseService classeService;
    private final ContenuService contenuService;

    /**
     * Endpoint pour récupérer toutes les classes.
     * Accessible via GET /api/classes
     */
    @GetMapping
    public List<Classe> getAllClasses() {
        return classeService.getAllClasses();
    }

    /**
     * Endpoint pour récupérer les classes d'un enseignant spécifique.
     * Accessible via GET /api/classes/enseignant/{enseignantId}
     */
    @GetMapping("/{enseignantId}")
    public Response<List<Classe>> getClassesByEnseignant(@PathVariable String enseignantId) {
        return Response.succes(classeService.getClassesByEnseignant(enseignantId));
    }

    @PostMapping("/{classeId}/contenus")
    public ResponseEntity<String> addContenuToClasse(@PathVariable String classeId, @RequestBody Contenu contenu) {
        try {
            contenuService.add(classeId, contenu); // Appel au nouveau service
            return new ResponseEntity<>("Contenu ajouté avec succès à la classe " + classeId, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur interne du serveur lors de l'ajout du contenu",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
