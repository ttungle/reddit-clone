package com.thanhtungle.redditclone.repository;

import com.thanhtungle.redditclone.model.entity.Post;
import com.thanhtungle.redditclone.model.entity.Subreddit;
import com.thanhtungle.redditclone.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllBySubreddit(Subreddit subreddit);

    List<Post> findAllByUser(User user);
}
