package com.thanhtungle.redditclone.service.impl;

import com.thanhtungle.redditclone.exception.NotFoundException;
import com.thanhtungle.redditclone.mapper.PostMapper;
import com.thanhtungle.redditclone.model.entity.Post;
import com.thanhtungle.redditclone.model.entity.Subreddit;
import com.thanhtungle.redditclone.model.entity.User;
import com.thanhtungle.redditclone.model.request.PostRequest;
import com.thanhtungle.redditclone.model.response.PostResponse;
import com.thanhtungle.redditclone.repository.PostRepository;
import com.thanhtungle.redditclone.repository.SubredditRepository;
import com.thanhtungle.redditclone.repository.UserRepository;
import com.thanhtungle.redditclone.service.AuthService;
import com.thanhtungle.redditclone.service.PostService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {

    private final SubredditRepository subredditRepository;
    private final AuthService authService;
    private final PostMapper postMapper;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    public void save(PostRequest postRequest) {
        Subreddit subreddit = subredditRepository.findByName(postRequest.getSubredditName()).orElseThrow(
                () -> new NotFoundException("No subreddit found with that name.")
        );
        User currentUser = authService.getCurrentUser();
        postRepository.save(postMapper.mapToPost(postRequest, subreddit, currentUser));
    }

    @Override
    public PostResponse getPost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new NotFoundException("No post found with that id.")
        );
        return postMapper.mapToDto(post);
    }

    @Transactional(readOnly = true)
    @Override
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(postMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PostResponse> getPostsBySubreddit(Long id) {
        Subreddit subreddit = subredditRepository.findById(id).orElseThrow(
                () -> new NotFoundException("No subreddit found with that id.")
        );
        List<Post> posts = postRepository.findAllBySubreddit(subreddit);
        return posts.stream().map(postMapper::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<PostResponse> getPostsByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new NotFoundException("No user found with that username.")
        );
        List<Post> posts = postRepository.findAllByUser(user);
        return posts.stream().map(postMapper::mapToDto).collect(Collectors.toList());
    }
}
