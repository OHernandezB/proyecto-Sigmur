package com.Sigmur.Reporting.service;

import com.Sigmur.Reporting.dto.ApiMessageResponse;
import org.springframework.stereotype.Service;

@Service
public class ReportingService {

    public ApiMessageResponse ping() {
        return new ApiMessageResponse("Reporting operativo");
    }
}
