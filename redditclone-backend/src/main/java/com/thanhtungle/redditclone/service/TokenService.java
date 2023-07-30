package com.thanhtungle.redditclone.service;

import org.springframework.security.core.Authentication;

public interface TokenService {

    public String generateToken(Authentication authentication);

    public String generateTokenWithUsername(String name, boolean authenticated);
}
