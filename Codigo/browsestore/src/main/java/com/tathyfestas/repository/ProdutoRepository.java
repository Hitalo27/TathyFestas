package com.tathyfestas.repository;

import com.tathyfestas.model.Categoria;
import com.tathyfestas.model.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByNomeContainingIgnoreCase(String nome);


    Page<Produto> findByCategoria(Categoria categoria, Pageable pageable);
}
