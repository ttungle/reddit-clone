package com.thanhtungle.redditclone.mapper;

import com.github.marlonlom.utilities.timeago.TimeAgo;
import com.thanhtungle.redditclone.model.entity.Post;
import com.thanhtungle.redditclone.model.entity.Subreddit;
import com.thanhtungle.redditclone.model.entity.User;
import com.thanhtungle.redditclone.model.request.post.PostRequest;
import com.thanhtungle.redditclone.model.response.post.PostResponse;
import com.thanhtungle.redditclone.repository.CommentRepository;
import com.thanhtungle.redditclone.repository.VoteRepository;
import com.thanhtungle.redditclone.service.AuthService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class PostMapper {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private VoteRepository voteRepository;
    @Autowired
    private AuthService authService;

    @Mapping(target = "postName", source = "postRequest.name")
    @Mapping(target = "subreddit", source = "subreddit")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "createdDate", expression = "java(java.time.Instant.now())")
    @Mapping(target = "description", source = "postRequest.description")
    @Mapping(target = "voteCount", constant = "0")
    public abstract Post mapToPost(PostRequest postRequest, Subreddit subreddit, User user);

    @Mapping(target = "id", source="postId")
    @Mapping(target = "name", source="postName")
    @Mapping(target = "subredditName", source = "subreddit.name")
    @Mapping(target = "userName", source = "user.username")
    @Mapping(target = "commentCount", expression = "java(commentCount(post))")
    @Mapping(target = "duration", expression = "java(getDuration(post))")
    public abstract PostResponse mapToDto(Post post);

    Integer commentCount(Post post) {
        return commentRepository.findByPost(post).size();
    }

    String getDuration(Post post) {
        return TimeAgo.using(post.getCreatedDate().toEpochMilli());
    }
}
