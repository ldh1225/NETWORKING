package com.example.networking.social.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.networking.social.dto.PostDTO;
import com.example.networking.social.entity.Post;
import com.example.networking.social.repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<PostDTO> getAllPosts() {
        return postRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PostDTO createPost(PostDTO postDTO) {
        Post post = convertToEntity(postDTO);
        Post savedPost = postRepository.save(post);
        return convertToDto(savedPost);
    }

    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    private PostDTO convertToDto(Post post) {
        PostDTO postDTO = new PostDTO();
        return postDTO;
    }

    private Post convertToEntity(PostDTO postDTO) {
        Post post = new Post();
        return post;
    }
}
