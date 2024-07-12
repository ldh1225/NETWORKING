package com.example.networking.social.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.networking.social.dto.PostDTO;
import com.example.networking.social.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping
    public PostDTO createPost(@RequestBody PostDTO postDTO) {
        return postService.createPost(postDTO);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
    }
}
