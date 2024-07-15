package com.example.networking.social.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostDTO {
    private Long id;
    private Long userId;
    private String contentPost;
    private String imagePost;
    private int likesCount;
    private LocalDateTime createdAt;
    private List<CommentDTO> comments;


}