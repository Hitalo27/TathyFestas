package com.tathyfestas.controller;

import com.tathyfestas.DTO.ExibirProdutosDTO;
import com.tathyfestas.DTO.ProdutoDTO;
import com.tathyfestas.DTO.RelatorioEstoqueDTO;
import com.tathyfestas.model.Produto;
import com.tathyfestas.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService _produtoService;

    @GetMapping
    public List<ExibirProdutosDTO> buscarProdutos(@RequestParam(name = "nome", required = false) String nome) {
//        if (nome != null && !nome.trim().isEmpty())
//            return _produtoService.buscarProdutosPorNome(nome);

        return _produtoService.buscarTodosProdutos();
    }

    @GetMapping("/{id}")
    public Produto buscarProdutoPorId(@PathVariable Long id) {
        return _produtoService.buscarProdutoPorId(id);
    }

    @PostMapping
    public Produto salvarProduto(@RequestBody ProdutoDTO produtoDTO) {
        return _produtoService.salvarProduto(produtoDTO);
    }



    @DeleteMapping("/{id}")
    public void deletarProduto(@PathVariable Long id) {
        _produtoService.deletarProduto(id);
    }


}