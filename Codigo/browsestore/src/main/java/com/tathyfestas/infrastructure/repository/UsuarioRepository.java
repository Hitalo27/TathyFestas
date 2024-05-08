package com.tathyfestas.infrastructure.repository;

import com.tathyfestas.model.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsuario(String usuario);

    Optional<Usuario> findByEmail(String email);
}
