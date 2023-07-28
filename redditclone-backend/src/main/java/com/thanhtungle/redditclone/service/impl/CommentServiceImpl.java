package com.thanhtungle.redditclone.service.impl;

import com.thanhtungle.redditclone.exception.NotFoundException;
import com.thanhtungle.redditclone.mapper.CommentMapper;
import com.thanhtungle.redditclone.model.dto.CommentDto;
import com.thanhtungle.redditclone.model.entity.Comment;
import com.thanhtungle.redditclone.model.entity.NotificationEmail;
import com.thanhtungle.redditclone.model.entity.Post;
import com.thanhtungle.redditclone.model.entity.User;
import com.thanhtungle.redditclone.repository.CommentRepository;
import com.thanhtungle.redditclone.repository.PostRepository;
import com.thanhtungle.redditclone.repository.UserRepository;
import com.thanhtungle.redditclone.service.AuthService;
import com.thanhtungle.redditclone.service.CommentService;
import com.thanhtungle.redditclone.service.MailContentBuilder;
import com.thanhtungle.redditclone.service.MailService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;
    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;

    @Override
    public void save(CommentDto commentDto) {
        Post post = postRepository.findById(commentDto.getPostId()).orElseThrow(
                () -> new NotFoundException("No post found with id "+ commentDto.getPostId())
        );
        Comment comment = commentMapper.mapToComment(commentDto, post, authService.getCurrentUser());
        commentRepository.save(comment);

        String message = mailContentBuilder.build(post.getUser().getUsername()
                + " posted a comment on your post. "
        );
        sendCommentNotification(message, post.getUser());
    }

    @Override
    public List<CommentDto> getAllCommentsByPost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new NotFoundException("No post found with id: " + postId)
        );
        return commentRepository.findAllByPost(post)
                .stream()
                .map(commentMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentDto> getAllCommentsByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new NotFoundException("No user found with username: " + username)
        );
        return commentRepository.findAllByUser(user)
                .stream()
                .map(commentMapper::mapToDto)
                .collect(Collectors.toList());
    }

    private void sendCommentNotification(String message, User user) {
        mailService.sendMail(
                new NotificationEmail(
                        user.getUsername() + "Commented on your post",
                        user.getEmail(),
                        message
                )
        );
    }
}
