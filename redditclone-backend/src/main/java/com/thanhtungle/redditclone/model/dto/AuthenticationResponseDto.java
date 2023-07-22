package com.thanhtungle.redditclone.model.dto;

import com.thanhtungle.redditclone.model.entity.User;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthenticationResponseDto {

    private User user;
    private String accessToken;
}
