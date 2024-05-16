package com.tathyfestas.DTO;

import com.tathyfestas.model.Categoria;

import java.util.List;

public record ExibirProdutosDTO(
       Long id,

       String nome,

        String descricao,

        Double preco,

        Integer quantidadeEstoque,
        Categoria categoria,

        List<byte[]> imagens,
       Integer quantidadeBaixa

) {
}
