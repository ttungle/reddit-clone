package com.thanhtungle.redditclone.service.impl;

import com.thanhtungle.redditclone.mapper.SubredditMapper;
import com.thanhtungle.redditclone.model.dto.SubredditDto;
import com.thanhtungle.redditclone.model.entity.Subreddit;
import com.thanhtungle.redditclone.repository.SubredditRepository;
import com.thanhtungle.redditclone.service.SubredditService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
@Slf4j
public class SubredditServiceImpl implements SubredditService {

    private final SubredditRepository subredditRepository;
    private final SubredditMapper subredditMapper;

    public SubredditDto save (SubredditDto subredditDto) {
        Subreddit newSubreddit = subredditRepository.save(subredditMapper.mapDtoToSubreddit(subredditDto));
        subredditDto.setId(newSubreddit.getId());
        return subredditDto;
    }

    public List<SubredditDto> getAll() {
        return subredditRepository.findAll().stream().map(subredditMapper::mapSubredditToDto).collect(toList());
    }
}
