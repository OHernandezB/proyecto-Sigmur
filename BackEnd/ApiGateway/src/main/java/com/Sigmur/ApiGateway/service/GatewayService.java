package com.Sigmur.ApiGateway.service;

import com.Sigmur.ApiGateway.dto.ApiMessageResponse;
import org.springframework.stereotype.Service;

@Service
public class GatewayService {

    public ApiMessageResponse ping() {
        return new ApiMessageResponse("ApiGateway operativo");
    }
}
