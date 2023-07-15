package com.thanhtungle.redditclone.service;

import com.thanhtungle.redditclone.model.dto.RegisterRequest;
import com.thanhtungle.redditclone.model.entity.NotificationEmail;
import com.thanhtungle.redditclone.model.entity.User;
import com.thanhtungle.redditclone.model.entity.VerificationToken;
import com.thanhtungle.redditclone.repository.UserRepository;
import com.thanhtungle.redditclone.repository.VerificationTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final VerificationTokenRepository verificationTokenRepository;
    private final MailService mailService;

    @Transactional
    public void signup(RegisterRequest registerRequest) {
        User user = new User();

        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setCreated(Instant.now());
        user.setEnabled(false);
        userRepository.save(user);

        String token = generateVerificationToken(user);

        NotificationEmail notificationEmail = new NotificationEmail(
                "Please activate your account",
                user.getEmail(),
                "Welcome to Reddit clone, we're glad to have you. "
                        + "\nPlease click on the below url to activate your account: "
                        + "\nhttp://localhost:8080/api/v1/auth/accountVerification/" + token);
        mailService.sendMail(notificationEmail);
    }

    private String generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();

        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);

        verificationTokenRepository.save(verificationToken);
        return token;
    }
}
