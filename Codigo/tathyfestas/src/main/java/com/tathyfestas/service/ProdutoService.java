package com.tathyfestas.service;

import com.tathyfestas.DTO.ExibirProdutosDTO;
import com.tathyfestas.DTO.ProdutoDTO;
import com.tathyfestas.repository.ProdutoRepository;
import com.tathyfestas.model.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository _produtoRepository;

    public List<ExibirProdutosDTO> buscarTodosProdutos() {
        List<Produto> produtos = _produtoRepository.findAll();
        return produtos.stream()
                .map(this::mapProdutoParaExibirProdutosDTO)
                .collect(Collectors.toList());
    }

    private ExibirProdutosDTO mapProdutoParaExibirProdutosDTO(Produto produto) {
        ExibirProdutosDTO dto = new ExibirProdutosDTO(produto.getId(), produto.getNome(), produto.getDescricao(), produto.getPreco(), produto.getQuantidadeEstoque(),
         produto.getCategoria(), produto.getImagens(), produto.getQuantidadeBaixa());
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
