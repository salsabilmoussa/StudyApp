package com.example.studyapp.repository;

import com.example.studyapp.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
    // Vous pouvez ajouter des méthodes spécifiques de requête ici si nécessaire
}