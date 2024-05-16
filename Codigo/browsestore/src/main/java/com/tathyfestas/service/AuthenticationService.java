package com.tathyfestas.service;

import com.tathyfestas.repository.RedefinicaoSenhaTokenRepository;
import com.tathyfestas.repository.UsuarioRepository;
import com.tathyfestas.model.RedefinicaoSenhaToken;
import com.tathyfestas.model.Usuario;
import com.tathyfestas.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthenticationService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository _usuarioRepository;

    // @Autowired
    // private EmailService _emailService;

    @Autowired
    private RedefinicaoSenhaTokenRepository _redefinicaoSenhaTokenRepository;

    public ResponseEntity<?> autenticar(String username, String password) {
        Usuario usuario = _usuarioRepository.findByUsuario(username).orElse(null);

        if (usuario != null) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            if (encoder.matches(password, usuario.getSenha())) {
                Map<String, String> responseBody = new HashMap<>();

                responseBody.put("token", jwtUtil.gerarToken(usuario.getId()));

                return new ResponseEntity<>(responseBody, HttpStatus.OK);
            }
        }

        return new ResponseEntity<>("Falha na autenticação: Usuário ou senha invalida", HttpStatus.UNAUTHORIZED);
    }

    public void processarRequisicaoSenha(String email) {
        Usuario usuario = _usuarioRepository.findByEmail(email).orElse(null);

        if (usuario == null)
            throw new UsernameNotFoundException("Nenhum usuário encontrado para o email: " + email);

        String token = UUID.randomUUID().toString();
        Date dataExpiracao = new Date(System.currentTimeMillis() + (1000 * 60 * 60));
        RedefinicaoSenhaToken redefinicaoSenhaToken = new RedefinicaoSenhaToken(token, usuario, dataExpiracao);

        _redefinicaoSenhaTokenRepository.save(redefinicaoSenhaToken);

        String resetLink = "https://localhost:3000/ResetPassword?token=" + token;

        // _emailService.enviarRedefinicaoSenha(email, resetLink);
    }

    public void redefinirSenha(String token, String novaSenha) {
        RedefinicaoSenhaToken redefinicaoSenhaToken = _redefinicaoSenhaTokenRepository.findByToken(token);

        if (redefinicaoSenhaToken == null || redefinicaoSenhaToken.getDataExpiracao().before(new Date()))
            throw new IllegalArgumentException("Token inválido ou expirado!");

        Usuario usuario = redefinicaoSenhaToken.getUsuario();
        usuario.setSenha(new BCryptPasswordEncoder().encode(novaSenha));
        _usuarioRepository.save(usuario);

        _redefinicaoSenhaTokenRepository.delete(redefinicaoSenhaToken);
    }
}
