package com.thanhtungle.redditclone.controller;

import com.thanhtungle.redditclone.model.dto.CommentDto;
import com.thanhtungle.redditclone.model.response.BaseApiResponse;
import com.thanhtungle.redditclone.model.response.BaseResponseWithoutData;
import com.thanhtungle.redditclone.service.CommentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
@AllArgsConstructor
@SecurityRequirement(name = "BearerAuth")
@Tag(name = "Comments")
public class CommentsController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<BaseResponseWithoutData> createComment(@RequestBody CommentDto commentDto) {
        commentService.save(commentDto);
        BaseResponseWithoutData response = new BaseResponseWithoutData();
        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("The comment has been created successfully.");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<BaseApiResponse<List<CommentDto>>> getAllCommentsByPost(@PathVariable Long postId) {
        BaseApiResponse<List<CommentDto>> response = new BaseApiResponse<>();
        response.setStatus(HttpStatus.OK.value());
        response.setData(commentService.getAllCommentsByPost(postId));
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<BaseApiResponse<List<CommentDto>>> getAllCommentsByUsername(@PathVariable String username) {
        BaseApiResponse<List<CommentDto>> response = new BaseApiResponse<>();
        response.setStatus(HttpStatus.OK.value());
        response.setData(commentService.getAllCommentsByUsername(username));
        return ResponseEntity.ok().body(response);
    }
}
