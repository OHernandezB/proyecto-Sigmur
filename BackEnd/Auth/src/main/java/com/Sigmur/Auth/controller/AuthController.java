package com.Sigmur.Auth.controller;

import com.Sigmur.Auth.dto.AuthResponse;
import com.Sigmur.Auth.dto.LoginRequest;
import com.Sigmur.Auth.dto.RegisterRequest;
import com.Sigmur.Auth.dto.UsuarioResponse;
import com.Sigmur.Auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
