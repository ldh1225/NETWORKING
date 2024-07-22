package com.example.networking.social.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.networking.social.dto.PostDTO;
import com.example.networking.social.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @GetMapping
    public List<PostDTO> getAllPosts() {
        logger.info("Fetching all posts");
        return postService.getAllPosts();
    }

    @PostMapping(consumes = "multipart/form-data")
    public PostDTO createPost(
            @RequestParam("userId") Long userId,
            @RequestParam("contentPost") String contentPost,
            @RequestParam(value = "imagePost", required = false) MultipartFile imagePost) {
        
        logger.info("Creating a new post for userId: {}, contentPost: {}", userId, contentPost);

        PostDTO postDTO = new PostDTO();
        postDTO.setUserId(userId.toString());
        postDTO.setContentPost(contentPost);
        if (imagePost != null && !imagePost.isEmpty()) {
            String imagePath = saveImage(imagePost);
            postDTO.setImagePost(imagePath);
            logger.info("Image uploaded to: {}", imagePath);
        }

        return postService.createPost(postDTO);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long postId) {
        logger.info("Deleting post with id: {}", postId);
        postService.deletePost(postId);
    }

    private String saveImage(MultipartFile imageFile) {
        String filePath = "images/" + imageFile.getOriginalFilename();
        try {
            imageFile.transferTo(new java.io.File(filePath));
            logger.info("Image saved at: {}", filePath);
        } catch (Exception e) {
            logger.error("Error saving image", e);
        }
        return filePath;
    }
}
