package com.example.studyapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.List;

import com.example.studyapp.dto.PostDto;
import com.example.studyapp.dto.UploadPostResponse;
import com.example.studyapp.model.Post;
import com.example.studyapp.repository.PostRepository;

@Service
public class PostService {

    @Value("${uploadDirectory}")
    private String uploadDirectory;

    private final PostRepository postRepository;


    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public UploadPostResponse uploadPost(String postText, MultipartFile multipartFile) {
        Post post = new Post();
        if (!multipartFile.isEmpty()) {
            try {
                // Vérifiez si le répertoire de téléchargement existe, sinon créez-le
                File directory = new File(uploadDirectory);
                if (!directory.exists()) {
                    if (!directory.mkdirs()) {
                        throw new RuntimeException("Impossible de créer le répertoire de téléchargement.");
                    }
                }

                // Récupérez le nom du fichier
                String fileName = multipartFile.getOriginalFilename();

                // Définir le chemin complet pour enregistrer le fichier
                String filePath = uploadDirectory + File.separator + fileName;

                // Enregistrez le fichier sur le système de fichiers du serveur
                multipartFile.transferTo(new File(filePath));

                // Créez une URL relative pour le fichier téléchargé
                String documentUrl = "assets/uploads/" + fileName;

                // Créer une instance de Post avec l'URL du document
                post.setDocumentUrl(documentUrl);


            } catch (IOException e) {
                throw new RuntimeException("Impossible de sauvegarder le fichier : " + e.getMessage());
            }
        }
        
        post.setDescription(postText);
        post.setCommentList(null);
        post.setLikes(0);
        var savedPost = postRepository.save(post);
        return new UploadPostResponse(savedPost.getId(), savedPost.getDocumentUrl());


    }

    // Map the postDto fields to post
    public PostDto editPost(PostDto postDto) {
        Post savedPost = getPostById(postDto.getId()); 
        savedPost.setDescription(postDto.getDescription());
        postRepository.save(savedPost);
        return postDto;

    }

    Post getPostById(String postId){
        return postRepository.findById(postId)
        .orElseThrow(() -> new IllegalArgumentException("cannot find post by id= " + postId));
    }
}
