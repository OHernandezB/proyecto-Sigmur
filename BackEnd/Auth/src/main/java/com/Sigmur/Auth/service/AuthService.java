package com.Sigmur.Auth.service;

import com.Sigmur.Auth.dto.AuthResponse;
import com.Sigmur.Auth.dto.LoginRequest;
import com.Sigmur.Auth.dto.RegisterRequest;
import com.Sigmur.Auth.dto.UsuarioResponse;
import com.Sigmur.Auth.entity.Rol;
import com.Sigmur.Auth.entity.Usuario;
import com.Sigmur.Auth.exception.BusinessException;
import com.Sigmur.Auth.repository.RolRepository;
import com.Sigmur.Auth.repository.UsuarioRepository;
import com.Sigmur.Auth.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public UsuarioResponse register(RegisterRequest request) {
        if (usuarioRepository.existsByCorreo(request.correo())) {
            throw new BusinessException("El correo ya se encuentra registrado");
        }
        if (usuarioRepository.existsByRutUsuario(request.rutUsuario())) {
            throw new BusinessException("El RUT ya se encuentra registrado");
        }

        Rol rol = rolRepository.findByNombreRol(request.rol().toUpperCase())
                .orElseThrow(() -> new BusinessException("El rol no existe en la base de datos"));

        Usuario usuario = Usuario.builder()
                .nombreCompleto(request.nombreCompleto())
                .rutUsuario(request.rutUsuario())
                .correo(request.correo().toLowerCase())
                .telefono(request.telefono())
                .direccion(request.direccion())
                .contraseniaHash(passwordEncoder.encode(request.contrasenia()))
                .estadoCuenta("ACTIVO")
                .rol(rol)
                .build();

        Usuario saved = usuarioRepository.save(usuario);
        return UsuarioResponse.fromEntity(saved);
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.correo().toLowerCase(), request.contrasenia())
        );

        Usuario usuario = (Usuario) authentication.getPrincipal();
        String token = jwtService.generateToken(
                usuario,
                Map.of(
                        "idUsuario", usuario.getIdUsuario(),
                        "rut", usuario.getRutUsuario(),
                        "rol", usuario.getRol().getNombreRol()
                )
        );

        return new AuthResponse(
                token,
                "Bearer",
                usuario.getIdUsuario(),
                usuario.getCorreo(),
                usuario.getRutUsuario(),
                usuario.getRol().getNombreRol()
        );
    }
}
