package com.Sigmur.Auth.entity;
 
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
 
import java.util.Collection;
import java.util.List;
 
@Entity
@Table(name = "usuario")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;
 
    @Column(name = "nombre_completo", nullable = false, length = 50)
    private String nombreCompleto;
 
    @Column(name = "rut_usuario", nullable = false, unique = true, length = 12)
    private String rutUsuario;
 
    @Column(name = "correo", nullable = false, unique = true, length = 50)
    private String correo;
 
    @Column(name = "telefono", length = 20)
    private String telefono;
 
    @Column(name = "direccion", length = 100)
    private String direccion;
 
    @Column(name = "contrasenia_hash", nullable = false, length = 255)
    private String contraseniaHash;
 
    @Column(name = "estado_cuenta", nullable = false, length = 20)
    private String estadoCuenta;
 
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_rol", nullable = false)
    private Rol rol;
 
    // ─── UserDetails ────────────────────────────────────────────────────────────
 
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + rol.getNombreRol()));
    }
 
    @Override
    public String getPassword() {
        return contraseniaHash;
    }
 
    @Override
    public String getUsername() {
        return correo; // usamos correo como username para Spring Security
    }
 
    @Override
    public boolean isAccountNonExpired() { return true; }
 
    @Override
    public boolean isAccountNonLocked() {
        return !"BLOQUEADO".equalsIgnoreCase(estadoCuenta);
    }
 
    @Override
    public boolean isCredentialsNonExpired() { return true; }
 
    @Override
    public boolean isEnabled() {
        return "ACTIVO".equalsIgnoreCase(estadoCuenta);
    }
}