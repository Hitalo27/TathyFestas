package com.tathyfestas.controller;

import com.tathyfestas.model.Usuario;
import com.tathyfestas.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService _usuarioService;

    @GetMapping
    public List<Usuario> buscarTodosUsuarios() {
        return _usuarioService.buscarTodosUsuarios();
    }

    @GetMapping("/{id}")
    public Usuario buscarUsuarioPorId(@PathVariable Long id) {
        return _usuarioService.buscarUsuarioPorId(id);
    }

    @PostMapping
    public Usuario salvarUsuario(@RequestBody Usuario usuario) {
        return _usuarioService.salvarUsuario(usuario);
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Long id) {
        _usuarioService.deletarUsuario(id);
    }

    @PatchMapping("/{id}")
    public Usuario atualizarUsuarioParcial(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return _usuarioService.atualizarUsuarioParcial(id, updates);
    }

    @GetMapping("/permissao/{id}")
    public String buscarPermissaoUsuario(@PathVariable Long id) {
        Usuario usuario = _usuarioService.buscarUsuarioPorId(id);
        
        return String.valueOf(usuario.getPermissao());
    }
}
