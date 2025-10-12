package com.PEIN.service;

import org.springframework.stereotype.Service;

import com.PEIN.pojos.*;
import com.PEIN.repository.ClasseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClasseService {

    private final ClasseRepository classeRepository;

    @Autowired
    public ClasseService(ClasseRepository classeRepository) {
        this.classeRepository = classeRepository;
    }

    /**
     * Retourne toutes les classes.
     * 
     * @return Une liste de toutes les classes.
     */
    public List<Classe> getAllClasses() {
        return classeRepository.findAll();
    }

    /**
     * Retourne les classes pour un enseignant spécifique.
     * 
     * @param enseignantId L'ID de l'enseignant.
     * @return Une liste de classes associées à l'enseignant.
     */
    public List<Classe> getClassesByEnseignant(String enseignantId) {
        return classeRepository.findByEnseignantId(enseignantId);
    }

}
