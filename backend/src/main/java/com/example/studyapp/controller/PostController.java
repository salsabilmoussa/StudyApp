package com.example.studyapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.studyapp.dto.CommentDto;
import com.example.studyapp.dto.PostDto;
import com.example.studyapp.model.Post;
import com.example.studyapp.service.PostService;

// import com.example.studyapp.service.PostService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void uploadPost(@RequestParam("postText") String postText, @RequestParam("file") MultipartFile file) {
       postService.uploadPost(postText, file);
    }

    @PutMapping()
    @ResponseStatus(HttpStatus.OK)
    public PostDto editPostMetadata(@RequestBody PostDto postDto){
        return postService.editPost(postDto);
    }

    @PostMapping("/{postId}/comment")
    @ResponseStatus(HttpStatus.OK)
    public void addComment(@PathVariable String postId, @RequestBody CommentDto commentDto){
        postService.addComment(postId, commentDto);
    }

    @DeleteMapping("/{postId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable String postId) {
        postService.deletePost(postId);
    }

    @GetMapping("/{postId}/comment")
    @ResponseStatus(HttpStatus.OK)
    public List<CommentDto> getAllComments(@PathVariable String postId){
        return postService.getAllComments(postId);
    }
    
    
    
}
