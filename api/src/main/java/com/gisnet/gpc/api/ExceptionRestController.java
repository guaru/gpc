package com.gisnet.gpc.api;

import java.util.HashMap;
import java.util.Map;

import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.constants.ConstantsMsg;
import com.gisnet.gpc.exception.NotExistException;
import com.gisnet.gpc.exception.TurnException;
import com.mongodb.MongoSocketOpenException;
import com.mongodb.MongoSocketWriteException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.validation.FieldError;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.http.HttpStatus;

public class ExceptionRestController {
   
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @ResponseStatus(HttpStatus.REQUEST_TIMEOUT)
    @ExceptionHandler(DataAccessResourceFailureException.class)
    public Map<String, String> handleValidationExceptions(DataAccessResourceFailureException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("TIME_OUT", "TIMEOUT_DATABASE");
        return errors;
    }

    @ResponseStatus(HttpStatus.REQUEST_TIMEOUT)
    @ExceptionHandler(MongoSocketWriteException.class)
    public Map<String, String> handleValidationExceptions(MongoSocketWriteException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("TIME_OUT", "TIMEOUT_DATABASE");
        return errors;
    }

    @ResponseStatus(HttpStatus.REQUEST_TIMEOUT)
    @ExceptionHandler(MongoSocketOpenException.class)
    public Map<String, String> handleValidationExceptions(MongoSocketOpenException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("TIME_OUT", "DATASOURCE_NOT_OPEN");
        return errors;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NullPointerException.class)
    public Map<String, String> handleValidationExceptions(NullPointerException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("NULL", "DATA NULL VALIDATE");
        return errors;
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(TurnException.class)
    public Map<String, String> handleValidationExceptions(TurnException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("error", ex.getMessage());
        return errors;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotExistException.class)
    public Map<String, String> handleValidationExceptions(NotExistException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("error", ConstantsMsg.NOT_FOUND);
        return errors;
    }
}
