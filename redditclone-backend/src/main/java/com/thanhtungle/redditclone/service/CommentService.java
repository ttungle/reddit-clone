package com.thanhtungle.redditclone.service;

import com.thanhtungle.redditclone.model.dto.CommentDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CommentService {

    @Transactional
    public void save(CommentDto commentDto);

    @Transactional(readOnly = true)
    public List<CommentDto> getAllCommentsByPost(Long postId);

    @Transactional(readOnly = true)
    List<CommentDto> getAllCommentsByUsername(String username);
}
