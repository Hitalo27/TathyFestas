package com.tathyfestas.DTO;

public class RelatorioEstoqueDTO {

    private Long id;
    private String nome;
    private Integer quantidadeEstoque;

    public RelatorioEstoqueDTO(Long id, String nome, Integer quantidadeEstoque) {
        this.id = id;
        this.nome = nome;
        this.quantidadeEstoque = quantidadeEstoque;
    }

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

    public Integer getQuantidadeEstoque() {
        return this.quantidadeEstoque;
    }

    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

}
