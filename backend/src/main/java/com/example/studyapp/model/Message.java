package com.example.studyapp.model;


import org.springframework.data.annotation.Id;

public class Message {

    @Id
    private String id;
    private String content;
    private String sender;
    private String groupId; 
    private String timestamp;
    private String img;
    // Constructeur
    public Message() {
    }

    // Getters et setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    public void setImg(String img){
        this.img=img;
    }
    public String getImg(){
        return this.img;
    }
}