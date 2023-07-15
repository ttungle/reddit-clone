package com.thanhtungle.redditclone.controller;

import com.thanhtungle.redditclone.model.dto.RegisterRequest;
import com.thanhtungle.redditclone.model.response.success.BaseResponseWithoutData;
import com.thanhtungle.redditclone.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<BaseResponseWithoutData> signup(@RequestBody RegisterRequest registerRequest) {
        authService.signup(registerRequest);

        return new ResponseEntity<>(
                new BaseResponseWithoutData(HttpStatus.OK.value(),
                                    "User registration successfully."), HttpStatus.OK);
    }

}
