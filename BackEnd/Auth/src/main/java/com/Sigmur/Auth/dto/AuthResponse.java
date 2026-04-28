package com.Sigmur.Auth.dto;

public record AuthResponse(
        String token,
        String tipoToken,
        Integer idUsuario,
        String correo,
        String rutUsuario,
        String rol
) {
}
