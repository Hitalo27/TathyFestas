package com.tathyfestas.service;

import com.tathyfestas.model.Permissao;
import com.tathyfestas.model.Usuario;
import com.tathyfestas.infrastructure.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository _usuarioRepository;

    public List<Usuario> buscarTodosUsuarios() {
        return _usuarioRepository.findAll();
    }

    public Usuario buscarUsuarioPorId(Long id) {
        return _usuarioRepository.findById(id).orElse(null);
    }

    public Usuario salvarUsuario(Usuario usuario) {
        usuario.criptografarSenha();

        return _usuarioRepository.save(usuario);
    }

    public void deletarUsuario(Long id) {
        _usuarioRepository.deleteById(id);
    }

    public Usuario atualizarUsuarioParcial(Long id, Map<String, Object> updates) {
        ;
        Usuario usuario = _usuarioRepository.findById(id).orElse(null);

        if (usuario != null) {

            if (updates.containsKey("usuario")) {
                usuario.setUsuario((String) updates.get("usuario"));
            }

            if (updates.containsKey("email")) {
                usuario.setEmail((String) updates.get("email"));
            }

            if (updates.containsKey("permissao")) {
                usuario.setPermissao(Permissao.valueOf((String) updates.get("permissao")));
            }

            return _usuarioRepository.save(usuario);
        } else {

            return null;
        }
    }
}
