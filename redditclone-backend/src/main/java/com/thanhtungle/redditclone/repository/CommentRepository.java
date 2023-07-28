package com.thanhtungle.redditclone.repository;

import com.thanhtungle.redditclone.model.entity.Comment;
import com.thanhtungle.redditclone.model.entity.Post;
import com.thanhtungle.redditclone.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPost(Post post);

    List<Comment> findAllByUser(User user);
}
