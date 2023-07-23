package com.thanhtungle.redditclone.controller;

import com.thanhtungle.redditclone.model.dto.SubredditDto;
import com.thanhtungle.redditclone.service.SubredditService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/subreddits")
@AllArgsConstructor
@Slf4j
public class SubredditController {

    private final SubredditService subredditService;

    @PostMapping
    public ResponseEntity<SubredditDto> createSubreddit(@RequestBody SubredditDto Subreddit) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(subredditService.save(Subreddit));
    }

    @GetMapping
    public ResponseEntity<List<SubredditDto>> getAllSubreddits() {
        return ResponseEntity.ok().body(subredditService.getAll());
    }
}
