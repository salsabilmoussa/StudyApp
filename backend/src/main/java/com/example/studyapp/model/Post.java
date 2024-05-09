package com.example.studyapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Document(value = "Post")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    private String id;
    private String description;
    private String userId;
    private Integer likes;
    private List<Comment> commentList = new CopyOnWriteArrayList<>();
    private String documentUrl;

    public void addComment(Comment comment) {
        commentList.add(comment);
    }

    
    
    
}
