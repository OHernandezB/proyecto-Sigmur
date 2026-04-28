package com.Sigmur.Auth.dto;

import com.Sigmur.Auth.entity.Usuario;

public record UsuarioResponse(
        Integer idUsuario,
        String nombreCompleto,
        String rutUsuario,
        String correo,
        String telefono,
        String direccion,
        String estadoCuenta,
        String rol
) {
    public static UsuarioResponse fromEntity(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getIdUsuario(),
                usuario.getNombreCompleto(),
                usuario.getRutUsuario(),
                usuario.getCorreo(),
                usuario.getTelefono(),
                usuario.getDireccion(),
                usuario.getEstadoCuenta(),
                usuario.getRol() != null ? usuario.getRol().getNombreRol() : null
        );
    }
}
