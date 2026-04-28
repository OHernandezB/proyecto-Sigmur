package com.Sigmur.ApiGateway.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ApiErrorResponse(
        String message,
        String path,
        LocalDateTime timestamp,
        Map<String, String> validationErrors
) {
}
