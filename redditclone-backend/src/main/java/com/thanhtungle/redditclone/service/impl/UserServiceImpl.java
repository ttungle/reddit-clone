package com.thanhtungle.redditclone.service.impl;

import com.thanhtungle.redditclone.exception.NotFoundException;
import com.thanhtungle.redditclone.model.entity.User;
import com.thanhtungle.redditclone.repository.UserRepository;
import com.thanhtungle.redditclone.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User cannot be found with that id"));
    }
}
