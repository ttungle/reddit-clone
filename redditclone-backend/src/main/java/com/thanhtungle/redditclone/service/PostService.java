package com.thanhtungle.redditclone.service;

import com.thanhtungle.redditclone.model.entity.Post;
import com.thanhtungle.redditclone.model.request.PostRequest;
import com.thanhtungle.redditclone.model.response.PostResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface PostService {

    public void save(PostRequest postRequest);

    @Transactional(readOnly = true)
    PostResponse getPost(Long id);

    @Transactional(readOnly = true)
    List<PostResponse> getAllPosts();

    List<PostResponse> getPostsBySubreddit(Long id);

    List<PostResponse> getPostsByUsername(String username);
}
