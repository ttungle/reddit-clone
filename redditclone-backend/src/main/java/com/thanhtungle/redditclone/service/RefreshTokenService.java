package com.thanhtungle.redditclone.service;

import com.thanhtungle.redditclone.model.entity.RefreshToken;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface RefreshTokenService {

    public RefreshToken generateRefreshToken();

    public void validateRefreshToken(String token);

    public void deleteRefreshToken(String token);
}
