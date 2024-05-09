package com.example.studyapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.studyapp.model.Subject;

public interface SubjectRepository extends MongoRepository<Subject ,String> {
    
}



