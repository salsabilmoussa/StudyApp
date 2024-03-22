package com.example.studyapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.studyapp.model.Post;
import com.example.studyapp.repository.PostRepository;

@SpringBootApplication
public class StudyAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudyAppApplication.class, args);
	}

	// @Bean
	// CommandLineRunner runner(PostRepository repository){
	// 	return args -> {
	// 		// Post post= new Post("test", "testtest", "1", 4, null);
	// 		// repository.insert(post);
	// 	};

	// }

}
