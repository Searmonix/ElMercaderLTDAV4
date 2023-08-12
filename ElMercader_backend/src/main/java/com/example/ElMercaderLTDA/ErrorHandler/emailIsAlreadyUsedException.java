package com.example.ElMercaderLTDA.ErrorHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class emailIsAlreadyUsedException extends RuntimeException {
    
    public emailIsAlreadyUsedException(String email) {
        super(String.format("A user with the email :\n" +
                "\t e-mail: %s \n" +
                "already exists", email));
    }
}