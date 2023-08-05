package com.thanhtungle.redditclone.service;

import com.thanhtungle.redditclone.model.entity.User;
import org.springframework.transaction.annotation.Transactional;

public interface UserService {

    @Transactional(readOnly = true)
    public User getUser(Long id);
}
