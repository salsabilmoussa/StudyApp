package com.example.studyapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.studyapp.model.Groupe;

public interface GroupeRepository extends MongoRepository<Groupe, String> {
    
}
