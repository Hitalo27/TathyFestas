package com.tathyfestas.infrastructure.repository.pessoa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tathyfestas.model.pessoa.Socio;

public interface SocioRepository extends JpaRepository<Socio, Long>{

	List<Socio> findByNomeContainingIgnoreCase(String nome);

}
