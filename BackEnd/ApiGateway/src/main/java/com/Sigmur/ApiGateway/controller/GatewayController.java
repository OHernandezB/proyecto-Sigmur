package com.Sigmur.ApiGateway.controller;

import com.Sigmur.ApiGateway.dto.ApiMessageResponse;
import com.Sigmur.ApiGateway.service.GatewayService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gateway")
@RequiredArgsConstructor
public class GatewayController {

    private final GatewayService gatewayService;

    @GetMapping("/ping")
    public ApiMessageResponse ping() {
        return gatewayService.ping();
    }
}
