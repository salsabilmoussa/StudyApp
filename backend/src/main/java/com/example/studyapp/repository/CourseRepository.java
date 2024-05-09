package com.example.studyapp.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.studyapp.model.Course;

public interface CourseRepository extends MongoRepository<Course ,String>{
    
}
