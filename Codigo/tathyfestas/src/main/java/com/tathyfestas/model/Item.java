package com.tathyfestas.model;

import com.tathyfestas.DTO.ItemDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private int quantidade;

    public Item() {
    }


    public Item(ItemDTO itemDTO) {
       this.nome = itemDTO.nome();
       this.quantidade = itemDTO.quantidade();
    }

    public Long getId() {
        return id;
    }
    public String getNome() {
        return nome;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }


}
