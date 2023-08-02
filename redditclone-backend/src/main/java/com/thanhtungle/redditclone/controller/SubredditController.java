package com.thanhtungle.redditclone.controller;

import com.thanhtungle.redditclone.model.dto.SubredditDto;
import com.thanhtungle.redditclone.service.SubredditService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Subreddits")
public class SubredditController {

    private final SubredditService subredditService;

    @PostMapping
    @Operation(security = {@SecurityRequirement(name = "BearerAuth")})
    public ResponseEntity<SubredditDto> createSubreddit(@RequestBody SubredditDto Subreddit) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(subredditService.save(Subreddit));
    }

    @GetMapping
    public ResponseEntity<List<SubredditDto>> getAllSubreddits() {
        return ResponseEntity.ok().body(subredditService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubredditDto> getSubreddit(@PathVariable Long id) {
        return ResponseEntity.ok().body(subredditService.getSubreddit(id));
    }
}
