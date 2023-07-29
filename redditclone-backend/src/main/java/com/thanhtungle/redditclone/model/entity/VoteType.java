package com.thanhtungle.redditclone.model.entity;


import com.thanhtungle.redditclone.exception.NotFoundException;

import java.util.Arrays;

public enum VoteType {

    UPVOTE(1), DOWNVOTE(-1);

    private int direction;

    VoteType(int direction) {
    }

    public static VoteType lookup(Integer direction) {
        return Arrays.stream(VoteType.values())
                .filter(value -> value.getDirection().equals(direction))
                .findAny()
                .orElseThrow(() -> new NotFoundException("No vote found with direction: " + direction));
    }

    public Integer getDirection() {
        return direction;
    }
}
