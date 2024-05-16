package com.tathyfestas.service;

import com.tathyfestas.DTO.ItemDTO;
import com.tathyfestas.DTO.RelatorioEstoqueDTO;
import com.tathyfestas.repository.ItemRepository;
import com.tathyfestas.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public Item salvarProduto(ItemDTO itemDTO) {
        Item item = new Item(itemDTO);
        itemRepository.save(item);
        return item;
    }

    public List<RelatorioEstoqueDTO> relatorioEstoqueToDTO() {

        var itens = itemRepository.findAll();

        List<RelatorioEstoqueDTO> itensRelatorio = new ArrayList<>();

        for (Item item : itens) {
            itensRelatorio.add(
                    new RelatorioEstoqueDTO(
                            item.getId(),
                            item.getNome(),
                            item.getQuantidade()));
        }

        return itensRelatorio;
    }

    public Item incrementarItem(Long id) {
        Item item = itemRepository.findById(id).get();
        item.setQuantidade(item.getQuantidade()+1);
        itemRepository.save(item);
        return item;
    }

    public Item decrementarItem(Long id) {
        Item item = itemRepository.findById(id).get();
        item.setQuantidade(item.getQuantidade()-1);
        itemRepository.save(item);
        return item;
    }

    public void deletarItem(Long id) {
        itemRepository.deleteById(id);

    }
}
