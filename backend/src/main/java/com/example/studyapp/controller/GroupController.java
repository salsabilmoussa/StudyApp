package com.example.studyapp.controller;

import com.example.studyapp.model.Groupe;
import com.example.studyapp.service.GroupeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groupe")
@CrossOrigin(origins = "*")
public class GroupController {

    @Autowired
    private GroupeService groupeService;

    @PostMapping("/group")
    public ResponseEntity<Groupe> createGroupe(@RequestBody Groupe groupe) {
        Groupe createdGroupe = groupeService.createGroupe(groupe);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGroupe);
    }

    @GetMapping("/group")
    public ResponseEntity<List<Groupe>> getAllGroupes() {
        List<Groupe> groupes = groupeService.getAllGroupes();
        return ResponseEntity.ok(groupes);
    }

    @GetMapping("/group/{id}")
    public ResponseEntity<Groupe> getGroupeById(@PathVariable String id) {
        Groupe groupe = groupeService.getGroupeById(id);
        if (groupe != null) {
            return ResponseEntity.ok(groupe);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/group/{id}")
    public ResponseEntity<Groupe> updateGroupe(@PathVariable String id, @RequestBody Groupe groupe) {
        Groupe updatedGroupe = groupeService.updateGroupe(id, groupe);
        if (updatedGroupe != null) {
            return ResponseEntity.ok(updatedGroupe);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/group/{id}")
    public ResponseEntity<Void> deleteGroupe(@PathVariable String id) {
        groupeService.deleteGroupe(id);
        return ResponseEntity.noContent().build();
    }
}