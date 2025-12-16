package com.PEIN.controller;

import com.PEIN.DTO.ClassRequestDTO;
import com.PEIN.entity.Classe;
import com.PEIN.entity.ClasseEleves;
import com.PEIN.service.ClasseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class ClasseController {

    private final ClasseService classeService;

    // 1️⃣ Créer une classe
    @PostMapping("/create")
    public ResponseEntity<Classe> createClasse(@RequestBody ClassRequestDTO request) {
        Classe createdClasse = classeService.createClasse(request);
        return ResponseEntity.ok(createdClasse);
    }

    // 2️⃣ Assigner un étudiant à une classe
    @PostMapping("/assign-student")
    public ResponseEntity<ClasseEleves> assignStudent(@RequestBody Long classeId, Long eleveId) {
        ClasseEleves ce = classeService.assignStudentToClasse(classeId,eleveId);
        return ResponseEntity.ok(ce);
    }

    // 3️⃣ Lister toutes les classes d’un enseignant
    @GetMapping("/teacher/{enseignantId}")
    public List<Classe> getClassesByTeacher(@PathVariable Long enseignantId) {
        List<Classe> classes = classeService.getClassesByTeacher(enseignantId);
        return classes;
    }
    @GetMapping("/")
    public List<Classe> getAllClasses() {
        List<Classe> classes = classeService.getAllClasses();
        return classes;
    }
}

