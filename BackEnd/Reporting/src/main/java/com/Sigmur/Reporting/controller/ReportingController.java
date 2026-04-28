package com.Sigmur.Reporting.controller;

import com.Sigmur.Reporting.dto.ApiMessageResponse;
import com.Sigmur.Reporting.service.ReportingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reporting")
@RequiredArgsConstructor
public class ReportingController {

    private final ReportingService reportingService;

    @GetMapping("/ping")
    public ApiMessageResponse ping() {
        return reportingService.ping();
    }
}
