package com.thanhtungle.redditclone.service;

import com.thanhtungle.redditclone.model.dto.SubredditDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SubredditService {

    @Transactional
    public SubredditDto save (SubredditDto subredditDto);

    @Transactional(readOnly = true)
    public List<SubredditDto> getAll();
}
