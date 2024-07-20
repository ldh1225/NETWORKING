package com.example.networking.social.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.networking.social.dto.CommentDTO;
import com.example.networking.social.entity.Comment;
import com.example.networking.social.entity.Users;
import com.example.networking.social.repository.CommentRepository;
import com.example.networking.social.repository.UserRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CommentDTO> getAllComments() {
        return commentRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CommentDTO createComment(CommentDTO commentDTO) {
        Comment comment = convertToEntity(commentDTO);
        Comment savedComment = commentRepository.save(comment);
        return convertToDto(savedComment);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    private CommentDTO convertToDto(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setUserId(String.valueOf(comment.getUser().getNo()));
        commentDTO.setContentComment(comment.getContentComment());
        commentDTO.setCreatedAt(comment.getCreatedAt());
        return commentDTO;
    }

    private Comment convertToEntity(CommentDTO commentDTO) {
        Comment comment = new Comment();
        comment.setId(commentDTO.getId());
        comment.setContentComment(commentDTO.getContentComment());
        comment.setCreatedAt(commentDTO.getCreatedAt());

        
        Users users = userRepository.findById(Integer.parseInt(commentDTO.getUserId()))
                .orElseThrow(() -> new RuntimeException("User not found"));
        comment.setUser(users);
        return comment;
    }
}