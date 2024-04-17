package com.example.studyapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class DetectionController {

    @GetMapping("/detection")
    public String performDetection() {
        // URL du serveur Python
        String pythonServerUrl = "http://localhost:9999/detection";
        
        // Effectuez une requête HTTP GET vers le serveur Python
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(pythonServerUrl, String.class);
        
        // Retournez la réponse reçue du serveur Python
        return response;
    }
}    
