package com.tathyfestas.controller;

import com.tathyfestas.model.LoginRequest;
import com.tathyfestas.service.AuthenticationService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return authenticationService.autenticar(loginRequest.getUsuario(), loginRequest.getSenha());
    }

    @PostMapping("/esqueci-senha")
    public ResponseEntity<?> esqueciSenha(@RequestBody Map<String, String> requestMap) {
        String email = requestMap.get("email");

        authenticationService.processarRequisicaoSenha(email);

        return ResponseEntity.ok().body("Link de redefinição enviado com sucesso!");
    }

    @PostMapping("/redefinicao-senha")
    public ResponseEntity<?> redefinirSenha(@RequestBody Map<String, String> requestMap) {
        try {
            String token = requestMap.get("token");
            String novaSenha = requestMap.get("senha");

            authenticationService.redefinirSenha(token, novaSenha);

            return ResponseEntity.ok("Senha atualizada com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
