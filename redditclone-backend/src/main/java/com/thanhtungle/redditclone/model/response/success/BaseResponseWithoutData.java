package com.thanhtungle.redditclone.model.response.success;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BaseResponseWithoutData {
    private int status;
    private String message;
}
