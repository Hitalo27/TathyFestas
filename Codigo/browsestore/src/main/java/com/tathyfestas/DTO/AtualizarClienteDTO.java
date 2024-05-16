package com.tathyfestas.DTO;

import com.tathyfestas.enums.ConheceuENUM;

import java.util.Date;

public record AtualizarClienteDTO(
        String nomeCompleto,
        String cpf,
        String identidade,
        String nomeAniversariante,
        String idadeAniversariante,
        String endereco,
        String telefone,
        String email,
        String instagram,
        String enderecoEvento,
        Date dataEvento,
        String horaEvento,
        String formaPagamento,
        ConheceuENUM comoConheceu
) {
}
