package com.thanhtungle.redditclone.service;

import com.thanhtungle.redditclone.model.request.post.PostRequest;
import com.thanhtungle.redditclone.model.response.post.PostResponse;
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
