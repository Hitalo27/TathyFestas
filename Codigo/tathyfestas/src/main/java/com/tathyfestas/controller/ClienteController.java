package com.tathyfestas.controller;

import com.tathyfestas.DTO.AtualizarClienteDTO;
import com.tathyfestas.DTO.InsertClienteDTO;
import com.tathyfestas.model.Cliente;
import com.tathyfestas.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    ClienteService clienteService;

    @PostMapping
    public ResponseEntity criarCliente(@RequestBody InsertClienteDTO insertClienteDTO){
        return ResponseEntity.ok(clienteService.criarCliente(insertClienteDTO));
    }

    @GetMapping
    public List<Cliente> buscarClientes() {
        List<Cliente> clientes= clienteService.buscarTodosClientes();
        return clientes;
    }

    @GetMapping("/{idCliente}")
    public Cliente buscarClientePorId(@PathVariable Long idCliente) {
        return clienteService.buscarClientePorId(idCliente);
    }

    @PatchMapping("/{idCliente}")
    public ResponseEntity editarCliente(@PathVariable Long idCliente, @RequestBody AtualizarClienteDTO atualizarClienteDTO){
       return ResponseEntity.ok(clienteService.editarCliente(idCliente, atualizarClienteDTO));
    }

    @DeleteMapping("/{idCliente}")
    public void deletarCliente(@PathVariable Long idCliente) {
        clienteService.deletarCliente(idCliente);
    }

}


