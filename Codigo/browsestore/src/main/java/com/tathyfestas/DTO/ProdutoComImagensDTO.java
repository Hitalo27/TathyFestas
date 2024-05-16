package com.tathyfestas.DTO;

import com.tathyfestas.model.Produto;

import java.util.List;

public record ProdutoComImagensDTO(
        Produto produto,
        List<byte[]> imagens
) {
}
