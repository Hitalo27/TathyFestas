package com.tathyfestas.controller.pessoa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tathyfestas.model.pessoa.Cliente;
import com.tathyfestas.service.pessoa.ClienteService;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<Cliente> buscarClientes() {
        return clienteService.buscarTodosClientes();
    }

    @GetMapping("/{idCliente}")
    public Cliente buscarClientePorId(@PathVariable Long idCliente) {
        return clienteService.buscarClientePorId(idCliente);
    }

    @PostMapping
    public Cliente salvarCliente(@RequestBody Cliente cliente) {
        return clienteService.salvarCliente(cliente);
    }

    @DeleteMapping("/{idCliente}")
    public void deletarCliente(@PathVariable Long idCliente) {
        clienteService.deletarCliente(idCliente);
    }
}
