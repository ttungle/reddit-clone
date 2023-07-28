package com.thanhtungle.redditclone.mapper;

import com.thanhtungle.redditclone.model.entity.Comment;
import com.thanhtungle.redditclone.model.entity.Post;
import com.thanhtungle.redditclone.model.entity.User;
import com.thanhtungle.redditclone.model.dto.CommentDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "text", source = "commentDto.content")
    @Mapping(target = "createdDate", expression = "java(java.time.Instant.now())")
    @Mapping(target = "post", source = "post")
    @Mapping(target = "user", source = "user")
    Comment mapToComment(CommentDto commentDto, Post post, User user);

    @Mapping(target = "content", source = "comment.text")
    @Mapping(target = "postId", expression = "java(comment.getPost().getPostId())")
    @Mapping(target = "userName", expression = "java(comment.getUser().getUsername())")
    CommentDto mapToDto(Comment comment);
}
