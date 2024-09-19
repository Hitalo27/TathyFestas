package com.tathyfestas.DTO;

import com.tathyfestas.model.Produto;

import java.util.List;

public record ProdutoPageDTO(
        List<Produto> content,
        int totalPages,
        long totalElements,
        int number,
        int size

) {
}
