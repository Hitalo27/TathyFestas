package com.tathyfestas.service;

import com.tathyfestas.DTO.ExibirProdutosDTO;
import com.tathyfestas.DTO.ProdutoDTO;
import com.tathyfestas.DTO.ProdutoPageDTO;
import com.tathyfestas.repository.ProdutoRepository;
import com.tathyfestas.model.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
