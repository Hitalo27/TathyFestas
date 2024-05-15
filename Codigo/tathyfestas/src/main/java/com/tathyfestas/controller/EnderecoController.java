package com.tathyfestas.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;

import com.tathyfestas.model.Endereco;
import com.tathyfestas.service.EnderecoService;

public class EnderecoController {
    private EnderecoService enderecoService;

    public EnderecoController() {
        this.enderecoService = new EnderecoService();
    }

    @GetMapping("/{cep}")
    public Endereco consultarEnderecoPorCEP(String cep) {
        try {
            return enderecoService.buscarEnderecoPorCEP(cep);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
