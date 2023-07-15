package com.thanhtungle.redditclone.exception;

public class VerifyTokenMailException extends RuntimeException {
    public VerifyTokenMailException(String message) {
        super(message);
    }

    public VerifyTokenMailException(String message, Throwable cause) {
        super(message, cause);
    }
}
