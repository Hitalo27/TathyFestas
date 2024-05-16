package com.tathyfestas.model;

import jakarta.persistence.*;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.tathyfestas.interfaces.Credenciais;

@Entity
public class Usuario implements Credenciais {
    public Usuario() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String usuario;

    private String senha;

    @Enumerated(EnumType.STRING)
    private Permissao permissao;

    private String email;

    //TODO removido temporáriamente, ficará somente no map da entidade e sem no DTO
    // @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    // private Carrinho carrinho;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getUsuario() {
        return this.usuario;
    }

    @Override
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    @Override
    public String getSenha() {
        return this.senha;
    }

    @Override
    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Permissao getPermissao() {
        return this.permissao;
    }

    public void setPermissao(Permissao permissao) {
        this.permissao = permissao;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // public Carrinho getCarrinho() {
    //     return this.carrinho;
    // }

    // public void setCarrinho(Carrinho carrinho) {
    //     this.carrinho = carrinho;
    // }

    public void criptografarSenha() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        this.senha = passwordEncoder.encode(senha);
    }

    public boolean validarHashSenha(String senhaRaw) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        return passwordEncoder.matches(senhaRaw, this.senha);
    }
}
