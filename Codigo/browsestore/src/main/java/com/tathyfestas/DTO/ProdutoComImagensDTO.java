package com.tathyfestas.DTO;

import com.tathyfestas.model.Produto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public record ProdutoComImagensDTO(
        Produto produto,
        List<byte[]> imagens
) {
}
