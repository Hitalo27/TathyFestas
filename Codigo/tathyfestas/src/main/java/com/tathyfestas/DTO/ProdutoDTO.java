package com.tathyfestas.DTO;

import com.tathyfestas.model.Categoria;

import java.util.List;

public class ProdutoDTO {

    private Long id;
    private String nome;
    private String descricao;
    private Double preco;
    private Integer quantidadeEstoque;

    // private String imagemURL;
    private List<String> imagens;
    private Categoria categoria;
    private Integer quantidadeBaixa;



    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return this.preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Integer getQuantidadeEstoque() {
        return this.quantidadeEstoque;
    }

    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    // public String getImagemURL() {
    //     return this.imagemURL;
    // }

    // public void setImagemURL(String imagemURL) {
    //     this.imagemURL = imagemURL;
    // }

    public List<String> getImagens() {
        return this.imagens;
    }

//    public void setImagensFiles(List<File> imagensFiles) {
//        this.imagensURL = imagensFiles.stream()
//                .map(file -> file.getName()) // or you can map it to file.getPath(), file.toURI().toString(), etc. depending on what URL you want
//                .collect(Collectors.toList());
//    }
    public Categoria getCategoria() {
        return this.categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Integer getQuantidadeBaixa() {
        return this.quantidadeBaixa;
    }

    public void setQuantidadeBaixa(Integer quantidadeBaixa) {
        this.quantidadeBaixa = quantidadeBaixa;
    }
}
