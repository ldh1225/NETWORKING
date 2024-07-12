package com.example.networking.social.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PostDTO {
    private Long id;
    private UserDTO user;
    private String contentPost;
    private String imagePost;
    private int likesCount;
    private LocalDateTime createdAt;
    private List<CommentDTO> comments;

    // Getters and Setters
}
