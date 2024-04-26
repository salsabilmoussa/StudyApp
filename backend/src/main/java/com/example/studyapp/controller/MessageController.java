package com.example.studyapp.controller;

import com.example.studyapp.model.Message;
import com.example.studyapp.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/message")
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping("/message/{id}")
    public Message getMessageById(@PathVariable String id) {
        Optional<Message> message = messageService.getMessageById(id);
        return message.orElse(null); // Gestion de l'absence de message
    }

    @PostMapping("/message")
    public Message createMessage(@RequestBody Message message) {
        return messageService.saveMessage(message);
    }

    @DeleteMapping("/message/{id}")
    public void deleteMessage(@PathVariable String id) {
        messageService.deleteMessage(id);
    }
}