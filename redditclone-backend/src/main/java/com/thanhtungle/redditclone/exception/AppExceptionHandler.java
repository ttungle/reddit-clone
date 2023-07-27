package com.thanhtungle.redditclone.exception;

import com.thanhtungle.redditclone.model.response.BaseResponseWithoutData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    ResponseEntity<BaseResponseWithoutData> notFoundException(NotFoundException exc) {
        BaseResponseWithoutData error = new BaseResponseWithoutData();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage(exc.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<BaseResponseWithoutData> handleException(Exception exc) {
        BaseResponseWithoutData error = new BaseResponseWithoutData();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setMessage(exc.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}
