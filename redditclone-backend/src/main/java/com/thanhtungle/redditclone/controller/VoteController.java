package com.thanhtungle.redditclone.controller;

import com.thanhtungle.redditclone.model.dto.VoteDto;
import com.thanhtungle.redditclone.model.response.BaseResponseWithoutData;
import com.thanhtungle.redditclone.service.VoteService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/votes")
@AllArgsConstructor
@SecurityRequirement(name = "BearerAuth")
@Tag(name = "Votes")
public class VoteController {

    private final VoteService voteService;

    @PostMapping
    public ResponseEntity<BaseResponseWithoutData> vote(@RequestBody VoteDto voteDto) {
        voteService.vote(voteDto);
        BaseResponseWithoutData response = new BaseResponseWithoutData();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("Vote successfully.");
        return ResponseEntity.ok().body(response);
    }
}
