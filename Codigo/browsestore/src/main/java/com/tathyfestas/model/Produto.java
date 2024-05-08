package com.tathyfestas.model;

import com.tathyfestas.DTO.ProdutoDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.regex.Pattern;

@Entity
@Getter
@Setter
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    private Double preco;

    private Integer quantidadeEstoque;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;


    @ElementCollection(fetch = FetchType.EAGER)
    @Lob
    private List<byte[]> imagens;

    private Integer quantidadeBaixa;

    public Produto() {
    }

    public Produto(ProdutoDTO produtoDTO) {
        this.id = produtoDTO.getId();

        this.nome = produtoDTO.getNome();

        this.descricao = produtoDTO.getDescricao();

        this.preco = produtoDTO.getPreco();

        this.quantidadeEstoque = produtoDTO.getQuantidadeEstoque();

        this.categoria = produtoDTO.getCategoria();

        this.quantidadeBaixa = produtoDTO.getQuantidadeBaixa();

        if (produtoDTO.getImagens() != null) {
            List<byte[]> imagens = new ArrayList<>();
            for (String url : produtoDTO.getImagens()) {
                int posicaoVirgula = url.indexOf(",");
                if (posicaoVirgula != -1) {
                    String codigoBase64 = url.substring(posicaoVirgula + 1);
                    if (isValidBase64(codigoBase64)) {
                        byte[] imagemBytes = Base64.getDecoder().decode(codigoBase64);
                    imagens.add(imagemBytes);
                }} else {
                    System.out.println("Aviso: Ignorando URL de imagem inválida: " + url);
                }
            }
            this.imagens = imagens;
        }

    }

    public static boolean isValidBase64(String s) {
        return Pattern.matches("^[a-zA-Z0-9+/]*={0,2}$", s);
    }


    public List<byte[]> getImagens() {
        return this.imagens;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public Categoria getCategoria(){
        return categoria;
    }

    public Integer getQuantidadeBaixa(){
        return quantidadeBaixa;
    }


}