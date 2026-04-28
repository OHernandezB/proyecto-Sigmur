package com.Sigmur.Auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "El nombre completo es obligatorio")
        @Size(max = 50, message = "El nombre completo no puede superar 50 caracteres")
        String nombreCompleto,

        @NotBlank(message = "El RUT es obligatorio")
        @Size(max = 12, message = "El RUT no puede superar 12 caracteres")
        String rutUsuario,

        @NotBlank(message = "El correo es obligatorio")
        @Email(message = "El correo no tiene un formato valido")
        @Size(max = 50, message = "El correo no puede superar 50 caracteres")
        String correo,

        @Size(max = 20, message = "El telefono no puede superar 20 caracteres")
        String telefono,

        @Size(max = 100, message = "La direccion no puede superar 100 caracteres")
        String direccion,

        @NotBlank(message = "La contrasenia es obligatoria")
        @Size(min = 8, max = 100, message = "La contrasenia debe tener entre 8 y 100 caracteres")
        String contrasenia,

        @NotBlank(message = "El rol es obligatorio")
        @Pattern(
                regexp = "^(CIUDADANO|OPERARIO|ADMIN)$",
                message = "El rol debe ser CIUDADANO, OPERARIO o ADMIN"
        )
        String rol
) {
}
