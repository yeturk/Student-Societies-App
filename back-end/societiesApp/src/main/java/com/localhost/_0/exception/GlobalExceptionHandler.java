package com.localhost._0.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@ControllerAdvice
public class GlobalExceptionHandler {

    private List<String> addMapValue(List<String> errorsList, String newValue)
    {
        errorsList.add(newValue);
        return errorsList;
    }
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex)
    {
        Map<String, List<String>> errorsMap = new HashMap<>();
        for(ObjectError objError : ex.getBindingResult().getAllErrors())
        {
            //hangi fielddan hata aldığını bulur
            String fieldName = ((FieldError)objError).getField();
            if(errorsMap.containsKey(fieldName))
            {
                errorsMap.put(fieldName, addMapValue(errorsMap.get(fieldName), objError.getDefaultMessage()));
            }else{
                errorsMap.put(fieldName, addMapValue(new ArrayList<>(), objError.getDefaultMessage()));
            }

        }
        return ResponseEntity.badRequest().body(createApiError(errorsMap));
    }

    @ExceptionHandler(value = DateTimeParseException.class)
    public ResponseEntity<ApiError> handleDateTimeParseException(DateTimeParseException ex) {
        Map<String, List<String>> errorsMap = new HashMap<>();
        String fieldName = getFieldNameFromException(ex);
        errorsMap.put(fieldName, addMapValue(new ArrayList<>(), ex.getMessage()));
        return ResponseEntity.badRequest().body(createApiError(errorsMap));

    }
    private String getFieldNameFromException(DateTimeParseException ex) {
        String exceptionMessage = ex.getMessage();

        if (exceptionMessage.contains("startDate")) {
            return "startDate";
        } else if (exceptionMessage.contains("startTime")) {
            return "startTime";
        } else if (exceptionMessage.contains("endDate")) {
            return "endDate";
        } else if (exceptionMessage.contains("endTime")) {
            return "endTime";
        } else {
            return "dateTime";
        }
    }
    // The first <T> indicates that this method is generic method. It means the parameter should be generic.
    private <T> ApiError<T> createApiError(T errors)
    {
        ApiError<T> apiError = new ApiError<T>();
        apiError.setId(UUID.randomUUID().toString());
        apiError.setErrors(errors);
        return apiError;
    }
}
