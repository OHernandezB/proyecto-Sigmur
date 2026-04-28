package com.Sigmur.Auth.repository;

import com.Sigmur.Auth.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByCorreo(String correo);

    Optional<Usuario> findByRutUsuario(String rutUsuario);

    boolean existsByCorreo(String correo);

    boolean existsByRutUsuario(String rutUsuario);
}