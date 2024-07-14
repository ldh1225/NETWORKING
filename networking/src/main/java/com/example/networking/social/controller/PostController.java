package com.example.networking.social.controller;

import java.util.List;

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

    @Autowired
    private PostService postService;

    @GetMapping
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping(consumes = "multipart/form-data")
    public PostDTO createPost(
            @RequestParam("userId") Long userId,
            @RequestParam("contentPost") String contentPost,
            @RequestParam(value = "imagePost", required = false) MultipartFile imagePost) {
        
        PostDTO postDTO = new PostDTO();
        postDTO.setUserId(userId);
        postDTO.setContentPost(contentPost);
        if (imagePost != null && !imagePost.isEmpty()) {
            // 이미지 파일 처리 로직 추가
            String imagePath = saveImage(imagePost);
            postDTO.setImagePost(imagePath);
        }

        return postService.createPost(postDTO);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
    }

    private String saveImage(MultipartFile imageFile) {
        // 이미지 파일을 저장하는 로직을 구현합니다.
        // 파일을 서버의 특정 디렉토리에 저장하고, 저장된 파일 경로를 반환합니다.
        // 예시:
        // String filePath = "/images/" + imageFile.getOriginalFilename();
        // imageFile.transferTo(new File(filePath));
        // return filePath;
        return null; // 실제 구현에서는 파일 경로를 반환해야 합니다.
    }
}
