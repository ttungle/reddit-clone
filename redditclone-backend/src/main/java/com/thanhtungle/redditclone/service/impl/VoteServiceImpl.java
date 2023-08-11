package com.thanhtungle.redditclone.service.impl;

import com.thanhtungle.redditclone.exception.InvalidArgumentException;
import com.thanhtungle.redditclone.exception.NotFoundException;
import com.thanhtungle.redditclone.model.dto.VoteDto;
import com.thanhtungle.redditclone.model.entity.Post;
import com.thanhtungle.redditclone.model.entity.Vote;
import com.thanhtungle.redditclone.repository.PostRepository;
import com.thanhtungle.redditclone.repository.VoteRepository;
import com.thanhtungle.redditclone.service.AuthService;
import com.thanhtungle.redditclone.service.VoteService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.thanhtungle.redditclone.model.entity.VoteType.UPVOTE;

@Service
@AllArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final PostRepository postRepository;
    private final VoteRepository voteRepository;
    private final AuthService authService;

    @Override
    public void vote(VoteDto voteDto) {
        Post post = postRepository.findById(voteDto.getPostId())
                .orElseThrow(() -> new NotFoundException("No post found with id: " + voteDto.getPostId()));
        Optional<Vote> voteByPostAndUser = voteRepository
                .findTopByPostAndUserOrderByVoteIdDesc(post, authService.getCurrentUser());

        if (voteByPostAndUser.isPresent() &&
                voteByPostAndUser.get().getVoteType().equals(voteDto.getVoteType())) {
            throw new InvalidArgumentException("You have already " + voteDto.getVoteType() + " for this post.");
        }

        if (UPVOTE.equals(voteDto.getVoteType())) {
            if (post.getVoteCount() == -1) post.setVoteCount(post.getVoteCount() + 2);
           else post.setVoteCount(post.getVoteCount()  +1);
        } else {
            if (post.getVoteCount() == 1) post.setVoteCount(post.getVoteCount() - 2);
            else post.setVoteCount(post.getVoteCount()  - 1);
        }
        voteRepository.save(mapToVote(voteDto, post));
        postRepository.save(post);
    }

    private Vote mapToVote(VoteDto voteDto, Post post) {
        return Vote.builder()
                .voteType(voteDto.getVoteType())
                .post(post)
                .user(authService.getCurrentUser())
                .build();
    }
}
