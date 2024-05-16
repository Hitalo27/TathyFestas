package com.tathyfestas.controller;

import com.tathyfestas.DTO.ItemDTO;
import com.tathyfestas.DTO.RelatorioEstoqueDTO;
import com.tathyfestas.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itens")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping
    public ResponseEntity AdicionarItem(@RequestBody ItemDTO itemDTO) {
        return ResponseEntity.ok(itemService.salvarProduto(itemDTO));
    }

    @GetMapping
    public List<RelatorioEstoqueDTO> buscarProdutosEstoque() {
        return itemService.relatorioEstoqueToDTO();
    }

    @DeleteMapping("/{id}")
    public void deletarItem(@PathVariable Long id){
        itemService.deletarItem(id);
    }


    @PutMapping("/incrementar/{id}")
    public ResponseEntity incrementarItem(@PathVariable Long id){
        return ResponseEntity.ok(itemService.incrementarItem(id));
    }

    @PutMapping("/decrementar/{id}")
    public ResponseEntity decrementarItem(@PathVariable Long id){
        return ResponseEntity.ok(itemService.decrementarItem(id));
    }

}
