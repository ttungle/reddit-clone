package com.thanhtungle.redditclone.controller;

import com.thanhtungle.redditclone.model.entity.User;
import com.thanhtungle.redditclone.model.response.BaseApiResponse;
import com.thanhtungle.redditclone.service.AuthService;
import com.thanhtungle.redditclone.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
@Tag(name = "Users")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    @GetMapping("/{id}")
    public ResponseEntity<BaseApiResponse<User>> getUser(@PathVariable Long id) {
        BaseApiResponse<User> response = new BaseApiResponse<>();
        response.setStatus(HttpStatus.OK.value());
        response.setData(userService.getUser(id));
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<BaseApiResponse<User>> getMe() {
        BaseApiResponse<User> response = new BaseApiResponse<>();
        response.setStatus(HttpStatus.OK.value());
        response.setData(authService.getCurrentUser());
        return ResponseEntity.ok().body(response);
    }
}
