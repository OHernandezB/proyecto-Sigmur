package com.Sigmur.Workflow.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ApiErrorResponse(
        String message,
        String path,
        LocalDateTime timestamp,
        Map<String, String> validationErrors
) {
}
