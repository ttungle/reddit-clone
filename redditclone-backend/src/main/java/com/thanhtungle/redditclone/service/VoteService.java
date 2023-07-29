package com.thanhtungle.redditclone.service;

import com.thanhtungle.redditclone.model.dto.VoteDto;
import org.springframework.transaction.annotation.Transactional;

public interface VoteService {

    @Transactional
    public void vote(VoteDto voteDto);
}
