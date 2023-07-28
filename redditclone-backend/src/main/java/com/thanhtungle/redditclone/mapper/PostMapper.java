package com.thanhtungle.redditclone.mapper;

import com.thanhtungle.redditclone.model.entity.Post;
import com.thanhtungle.redditclone.model.entity.Subreddit;
import com.thanhtungle.redditclone.model.entity.User;
import com.thanhtungle.redditclone.model.request.post.PostRequest;
import com.thanhtungle.redditclone.model.response.post.PostResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {

    @Mapping(target = "postName", source = "postRequest.name")
    @Mapping(target = "subreddit", source = "subreddit")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "createdDate", expression = "java(java.time.Instant.now())")
    @Mapping(target = "description", source = "postRequest.description")
    Post mapToPost(PostRequest postRequest, Subreddit subreddit, User user);

    @Mapping(target = "id", source="postId")
    @Mapping(target = "name", source="postName")
    @Mapping(target = "subredditName", source = "subreddit.name")
    @Mapping(target = "userName", source = "user.username")
    PostResponse mapToDto(Post post);
}
