package com.example.studyapp.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.studyapp.model.Post;

public interface PostRepository extends MongoRepository<Post, String> {
}
