package com.thanhtungle.redditclone.service;

import com.thanhtungle.redditclone.model.dto.AuthenticationResponseDto;
import com.thanhtungle.redditclone.model.dto.LoginRequestDto;
import com.thanhtungle.redditclone.model.dto.RegisterRequestDto;
import com.thanhtungle.redditclone.model.entity.User;

public interface AuthService {

    public void signup(RegisterRequestDto registerRequest);

    public void verifyAccount(String token);

    public AuthenticationResponseDto login(LoginRequestDto loginRequest);

    public User getCurrentUser();
}
