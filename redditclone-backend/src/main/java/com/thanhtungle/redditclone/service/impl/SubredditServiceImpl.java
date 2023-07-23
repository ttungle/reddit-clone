package com.thanhtungle.redditclone.service.impl;

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

    private SubredditRepository subredditRepository;

    public SubredditDto save (SubredditDto subredditDto) {
        Subreddit newSubreddit = subredditRepository.save(mapSubredditDto(subredditDto));
        subredditDto.setId(newSubreddit.getId());
        return subredditDto;
    }

    private Subreddit mapSubredditDto(SubredditDto subredditDto) {
        return Subreddit.builder().name(subredditDto.getName())
                .description(subredditDto.getDescription())
                .build();
    }

    public List<SubredditDto> getAll() {
        return subredditRepository.findAll().stream().map(this::mapToDto).collect(toList());
    }

    private SubredditDto mapToDto(Subreddit subreddit) {
        return SubredditDto.builder()
                .name(subreddit.getName())
                .id(subreddit.getId())
                .totalPosts(subreddit.getPosts().size())
                .build();
    }
}
