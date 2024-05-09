package com.example.studyapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "groupe")
public class Groupe {

    @Id
    private String id;
    private String name;
    private String pic;
    private String lastMessage;

    // Ajoutez les constructeurs, les méthodes getters/setters et d'autres champs au besoin

    public Groupe() {
    }

    public Groupe(String name, String pic) {
        this.name = name;
        this.pic = pic;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name=name;
    }
    public String getPic(){
        return this.pic;
    }
    public void setPic(String pic){
        this.pic = pic;
    }
    public String getLastMessage(){
        return this.lastMessage;
    }
    public void setLastMessage(String lastMessage){
        this.lastMessage = lastMessage;
    }
}
