package com.thanhtungle.redditclone.controller;

import com.thanhtungle.redditclone.model.request.post.PostRequest;
import com.thanhtungle.redditclone.model.response.BaseApiResponse;
import com.thanhtungle.redditclone.model.response.BaseResponseWithoutData;
import com.thanhtungle.redditclone.model.response.post.PostResponse;
import com.thanhtungle.redditclone.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@AllArgsConstructor
@SecurityRequirement(name = "BearerAuth")
@Tag(name = "Posts")
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<BaseResponseWithoutData> createPost(@RequestBody PostRequest postRequest) {
        postService.save(postRequest);
        BaseResponseWithoutData response = new BaseResponseWithoutData();
        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("Post created successfully.");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseApiResponse<PostResponse>> getPost(@PathVariable Long id) {
        BaseApiResponse<PostResponse> baseApiResponse = new BaseApiResponse<>();
        baseApiResponse.setStatus(HttpStatus.OK.value());
        baseApiResponse.setData(postService.getPost(id));

        return ResponseEntity.ok().body(baseApiResponse);
    }

    @GetMapping
    @Operation(responses = {
            @ApiResponse(description = "Success", responseCode = "200"),
            @ApiResponse(description = "Unauthorized / Invalid token", responseCode = "403")
    })
    public ResponseEntity<BaseApiResponse<List<PostResponse>>> getAllPosts() {
        BaseApiResponse<List<PostResponse>> baseApiResponse = new BaseApiResponse<>();
        baseApiResponse.setStatus(HttpStatus.OK.value());
        baseApiResponse.setData(postService.getAllPosts());

        return ResponseEntity.ok().body(baseApiResponse);
    }

    @GetMapping("/subreddit/{id}")
    public ResponseEntity<BaseApiResponse<List<PostResponse>>> getPostsBySubreddit(@PathVariable Long id) {
        BaseApiResponse<List<PostResponse>> baseApiResponse = new BaseApiResponse<>();
        baseApiResponse.setStatus(HttpStatus.OK.value());
        baseApiResponse.setData(postService.getPostsBySubreddit(id));

        return ResponseEntity.ok().body(baseApiResponse);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<BaseApiResponse<List<PostResponse>> > getPostsByUsername(@PathVariable String username) {
        BaseApiResponse<List<PostResponse>> baseApiResponse = new BaseApiResponse<>();
        baseApiResponse.setStatus(HttpStatus.OK.value());
        baseApiResponse.setData(postService.getPostsByUsername(username));

        return ResponseEntity.ok().body(baseApiResponse);
    }


}
