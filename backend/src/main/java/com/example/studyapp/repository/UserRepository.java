package com.example.studyapp.repository;
import com.example.studyapp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserRepository extends MongoRepository<User ,String> {
}
