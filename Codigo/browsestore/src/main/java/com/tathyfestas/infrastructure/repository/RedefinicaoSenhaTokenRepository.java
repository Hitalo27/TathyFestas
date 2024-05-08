package com.tathyfestas.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tathyfestas.model.Usuario;
import com.tathyfestas.model.RedefinicaoSenhaToken;

public interface RedefinicaoSenhaTokenRepository extends JpaRepository<RedefinicaoSenhaToken, Long> {
    RedefinicaoSenhaToken findByToken(String token);
    RedefinicaoSenhaToken findByUsuario(Usuario usuario);
}
