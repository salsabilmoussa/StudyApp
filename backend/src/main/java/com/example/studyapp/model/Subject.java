package com.example.studyapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "subject")
public class Subject {
    
    @Id
    private String id;
    private String title;
    private String description;
    private String professor;
    private String image; 
    private String speciality;

  
    
    public Subject() {}

    public Subject(String title, String description, String professor, String image, String speciality) {
        this.title = title;
        this.description = description;
        this.professor = professor;
        this.image = image;
        this.speciality = speciality;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProfessor() {
        return professor;
    }

    public void setProfessor(String professor) {
        this.professor = professor;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    // toString method
    @Override
    public String toString() {
        return "Subject{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", professor='" + professor + '\'' +
                ", image='" + image + '\'' +
                ", speciality='" + speciality + '\'' +
                '}';
    }
}
