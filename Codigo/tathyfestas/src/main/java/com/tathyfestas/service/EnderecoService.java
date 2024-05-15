package com.tathyfestas.service;

import com.tathyfestas.repository.EnderecoRepository;
import com.tathyfestas.model.Endereco;

import java.io.IOException;

public class EnderecoService {
    private EnderecoRepository enderecoRepository;

    public EnderecoService() {
        this.enderecoRepository = new EnderecoRepository();
    }

    public Endereco buscarEnderecoPorCEP(String cep) throws IOException {
        return enderecoRepository.buscarEnderecoPorCEP(cep);
    }
}
