package com.tathyfestas.service;

import com.tathyfestas.DTO.ProdutoDTO;
import com.tathyfestas.DTO.ProdutoPageDTO;
import com.tathyfestas.model.Categoria;
import com.tathyfestas.model.Produto;
import com.tathyfestas.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository _produtoRepository;

    public List<Produto> buscarTodosProdutos() {
        return _produtoRepository.findAll();
    }

    public List<Produto> buscarProdutosPorNome(String nome) {
        return _produtoRepository.findByNomeContainingIgnoreCase(nome);
    }

    public ProdutoPageDTO buscarProdutosPaginacao(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit, Sort.by("quantidadeEstoque").ascending());
        Page<Produto> produtoPage = _produtoRepository.findAll(pageable);

        ProdutoPageDTO dto = new ProdutoPageDTO(
                produtoPage.getContent(), produtoPage.getTotalPages(), produtoPage.getTotalElements(), produtoPage.getNumber(), produtoPage.getSize()
        );


        return dto;
    }

    @Transactional
    public ProdutoPageDTO buscarProdutosPorCategoria(int page, int limit, String categoria) {
        Pageable pageable = PageRequest.of(page, limit, Sort.by("quantidadeEstoque").ascending());

        Categoria categoriaEnum = Categoria.valueOf(categoria.toUpperCase());
        System.out.println(categoriaEnum);

        Page<Produto> produtoPage = _produtoRepository.findByCategoria(categoriaEnum ,pageable);
        ProdutoPageDTO dto = new ProdutoPageDTO(
                produtoPage.getContent(), produtoPage.getTotalPages(), produtoPage.getTotalElements(), produtoPage.getNumber(), produtoPage.getSize()
        );

        return dto;
    }


    public Produto buscarProdutoPorId(Long id) {
        System.out.println(_produtoRepository.findById(id).orElse(null));
        return _produtoRepository.findById(id).orElse(null);
    }

//    public List<ExibirProdutosDTO> buscarProdutosPorNome(String nome) {
//        return _produtoRepository.findByNomeContainingIgnoreCase(nome);
//    }

    public Produto salvarProduto(ProdutoDTO produtoDTO) {
        Produto produto = new Produto(produtoDTO);
        return _produtoRepository.save(produto);
    }

    public void deletarProduto(Long id) {
        _produtoRepository.deleteById(id);
    }


}
