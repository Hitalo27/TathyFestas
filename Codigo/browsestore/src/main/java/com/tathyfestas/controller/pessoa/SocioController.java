package com.tathyfestas.controller.pessoa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tathyfestas.model.pessoa.Socio;
import com.tathyfestas.service.pessoa.SocioService;

@RestController
@RequestMapping("/api/socios")
public class SocioController {
    @Autowired
    private SocioService socioService;

    @GetMapping
    public List<Socio> buscarSocios(@RequestParam(name = "nome", required = false) String nome) {
        if (nome != null && !nome.trim().isEmpty())
            return socioService.buscarSociosPorNome(nome);

        return socioService.buscarTodosSocios();
    }

    @GetMapping("/{idSocio}")
    public Socio buscarSocioPorId(@PathVariable Long idSocio) {
        return socioService.buscarSocioPorId(idSocio);
    }

    @PostMapping
    public Socio salvarSocio(@RequestBody Socio socio) {
        return socioService.salvarSocio(socio);
    }

    @DeleteMapping("/{id}")
    public void deletarSocio(@PathVariable Long idSocio) {
    	socioService.deletarSocio(idSocio);
    }
}
