package com.example.studyapp.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
@Document(collection = "course")
public class Course {

    @Id
    private String id;
    private String title;
    private String description;
    private String subject;
    private List<String> cours;
    private List<String> td;
    private List<String> tp;
    

    // Constructors, getters, and setters

    public Course() {
    }

    public Course(String title, String description,String subject, List<String> cours, List<String> td, List<String> tp) {
        this.title = title;
        this.description = description;
        this.subject=subject;
        this.cours  = cours;
        this.td  = td;
        this.tp  = tp;
    }

    public Course(String title, String description,String subject, List<String> cours) {
        this.title = title;
        this.subject=subject;
        this.description = description;
        this.cours  = cours;
    }
    public Course(String title, String description,String subject, List<String> cours, List<String> td) {
        this.title = title;
        this.description = description;
        this.subject=subject;
        this.cours  = cours;
        this.td  = td;
    }
    public Course(String title, String description ,String subject) {
        this.title = title;
        this.subject=subject;
        this.description = description;
    }
    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public String getSubject() {
        return subject;
    }

    public void setSubject(String sub) {
        this.subject = sub;
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

    public List<String> getCours() {
    if (cours == null) {
        cours = new ArrayList<>(); // Initialize the list if it's null
    }
    return cours;
    }


    public void setCours(List<String> file) {
        this.cours = file;
    }
    public List<String> getTd() {
        if (td == null) {
            td = new ArrayList<>(); // Initialize the list if it's null
        }
        return td;
        }
    
    
        public void setTd(List<String> file) {
            this.td = file;
        }
        public List<String> getTp() {
            if (tp == null) {
                tp = new ArrayList<>(); // Initialize the list if it's null
            }
            return tp;
            }
        
        
            public void setTp(List<String> file) {
                this.tp = file;
            }

    // toString method

    @Override
    public String toString() {
        return "Course{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", cours='" + cours + '\'' +
                ", TD='" + td + '\'' +
                ", TP='" + tp + '\'' +
                '}';
    }

    
}
