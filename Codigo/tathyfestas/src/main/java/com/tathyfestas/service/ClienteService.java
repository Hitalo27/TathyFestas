package com.tathyfestas.service;

import com.tathyfestas.DTO.AtualizarClienteDTO;
import com.tathyfestas.DTO.InsertClienteDTO;
import com.tathyfestas.repository.ClienteRepository;
import com.tathyfestas.model.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente criarCliente(InsertClienteDTO insertClienteDTO) {
        Cliente cliente = new Cliente(insertClienteDTO);
        clienteRepository.save(cliente);
        return cliente;
    }

    public List<Cliente> buscarTodosClientes() {
        return clienteRepository.findAll();
    }

    public Cliente buscarClientePorId(Long id) {
        return clienteRepository.findById(id).orElse(null);
    }


    public void deletarCliente(Long id) {
        clienteRepository.deleteById(id);
    }


    public Cliente editarCliente(Long idCliente, AtualizarClienteDTO atualizarClienteDTO) {
        Cliente cliente = clienteRepository.findById(idCliente).get();
        System.out.println(atualizarClienteDTO.nomeCompleto());
        cliente.atualizar(atualizarClienteDTO);
        clienteRepository.save(cliente);
        return cliente;
    }
}
