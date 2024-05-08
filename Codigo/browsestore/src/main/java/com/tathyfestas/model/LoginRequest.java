package com.tathyfestas.model;

import com.tathyfestas.interfaces.Credenciais;

public class LoginRequest implements Credenciais {
    private String usuario;
    private String senha;

    @Override
    public String getUsuario() {
        return usuario;
    }

    @Override
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    @Override
    public String getSenha() {
        return senha;
    }

    @Override
    public void setSenha(String senha) {
        this.senha = senha;
    }
}