package com.tathyfestas.service.pessoa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tathyfestas.model.pessoa.Socio;
import com.tathyfestas.infrastructure.repository.pessoa.SocioRepository;

@Service
public class SocioService {
    @Autowired
    private SocioRepository socioRepository;

    public List<Socio> buscarTodosSocios() {
        return socioRepository.findAll();
    }

    public Socio buscarSocioPorId(Long id) {
        return socioRepository.findById(id).orElse(null);
    }

    public List<Socio> buscarSociosPorNome(String nome) {
        return socioRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Socio salvarSocio(Socio socio) {
        return socioRepository.save(socio);
    }

    public void deletarSocio(Long id) {
        socioRepository.deleteById(id);
    }
}
