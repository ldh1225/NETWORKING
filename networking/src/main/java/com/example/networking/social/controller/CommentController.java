package com.example.networking.social.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.networking.social.entity.Comment;
import com.example.networking.social.entity.Post;
import com.example.networking.social.repository.PostRepository;
import com.example.networking.social.service.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private PostRepository postRepository;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @PostMapping
    public Comment createComment(@RequestParam("postId") Long postId,
                                 @RequestParam("contentComment") String contentComment,
                                 @RequestParam("userId") Long userId) {
        Comment comment = new Comment();
        comment.setContentComment(contentComment);
        comment.setUserId(userId);

        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        comment.setPost(post);
        
        return commentService.createComment(comment);
    }
}
