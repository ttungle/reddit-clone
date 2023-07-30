package com.thanhtungle.redditclone.controller;

import com.thanhtungle.redditclone.model.dto.AuthenticationResponseDto;
import com.thanhtungle.redditclone.model.dto.LoginRequestDto;
import com.thanhtungle.redditclone.model.dto.RegisterRequestDto;
import com.thanhtungle.redditclone.model.request.authentication.RefreshTokenRequest;
import com.thanhtungle.redditclone.model.response.BaseResponseWithoutData;
import com.thanhtungle.redditclone.service.AuthService;
import com.thanhtungle.redditclone.service.RefreshTokenService;
import jakarta.validation.Valid;
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
    private RefreshTokenService refreshTokenService;

    @PostMapping("/signup")
    public ResponseEntity<BaseResponseWithoutData> signup(@RequestBody RegisterRequestDto registerRequest) {
        authService.signup(registerRequest);

        BaseResponseWithoutData responseBody = BaseResponseWithoutData.builder()
                .status(HttpStatus.OK.value())
                .message("User registration successfully.")
                .build();

        return ResponseEntity.ok().body(responseBody);
    }

    @GetMapping("/accountVerification/{token}")
    public ResponseEntity<BaseResponseWithoutData> verifyAccount(@PathVariable String token) {
        authService.verifyAccount(token);

        BaseResponseWithoutData responseBody = BaseResponseWithoutData.builder()
                .status(HttpStatus.OK.value())
                .message("Account activated successfully.")
                .build();

        return ResponseEntity.ok().body(responseBody);
    }

    @PostMapping("/login")
    public AuthenticationResponseDto login(@RequestBody LoginRequestDto loginRequestBody) {
        return authService.login(loginRequestBody);
    }

    @PostMapping("/refresh-token")
    public AuthenticationResponseDto refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.refreshToken(refreshTokenRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<BaseResponseWithoutData> logout(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.deleteRefreshToken(refreshTokenRequest.getRefreshToken());
        BaseResponseWithoutData response = new BaseResponseWithoutData();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("Logged out and refresh token deleted successfully.");
        return ResponseEntity.ok().body(response);
    }

}
