package com.example.ElMercaderLTDA.ErrorHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class userNotFoundException extends RuntimeException {
    
    public userNotFoundException(String email, String password) {
        super(String.format("No user with credentials:\n" +
                "\t e-mail: %s \n" +
                "\t password: %s \n" +
                "was found", email, password));
    }
}
