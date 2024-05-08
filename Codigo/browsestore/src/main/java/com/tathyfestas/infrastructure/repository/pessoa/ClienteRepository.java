package com.tathyfestas.infrastructure.repository.pessoa;



import org.springframework.data.jpa.repository.JpaRepository;

import com.tathyfestas.model.pessoa.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
