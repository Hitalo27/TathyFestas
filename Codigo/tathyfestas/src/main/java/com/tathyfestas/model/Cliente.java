package com.tathyfestas.model;

import com.tathyfestas.DTO.AtualizarClienteDTO;
import com.tathyfestas.DTO.InsertClienteDTO;
import com.tathyfestas.enums.ConheceuENUM;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomeCompleto;
    private String cpf;
    private String identidade;
    private String nomeAniversariante;
    private String idadeAniversariante;
    private String endereco;
    private String telefone;
    private String email;
    private String instagram;
    private String enderecoEvento;
    private Date dataEvento;
    private String horaEvento;
    private String formaPagamento;

    @Enumerated(EnumType.STRING)
    private ConheceuENUM comoConheceu;

    public Cliente(){

    }

    public Long getId() {
        return id;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public String getCpf() {
        return cpf;
    }

    public String getIdentidade() {
        return identidade;
    }

    public String getNomeAniversariante() {
        return nomeAniversariante;
    }

    public String getIdadeAniversariante() {
        return idadeAniversariante;
    }

    public String getEndereco() {
        return endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getEmail() {
        return email;
    }

    public String getInstagram() {
        return instagram;
    }

    public String getEnderecoEvento() {
        return enderecoEvento;
    }

    public Date getDataEvento() {
        return dataEvento;
    }

    public String getHoraEvento() {
        return horaEvento;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }

    public ConheceuENUM getComoConheceu(){
        return comoConheceu;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setIdentidade(String identidade) {
        this.identidade = identidade;
    }

    public void setNomeAniversariante(String nomeAniversariante) {
        this.nomeAniversariante = nomeAniversariante;
    }

    public void setIdadeAniversariante(String idadeAniversariante) {
        this.idadeAniversariante = idadeAniversariante;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public void setEnderecoEvento(String enderecoEvento) {
        this.enderecoEvento = enderecoEvento;
    }

    public void setDataEvento(Date dataEvento) {
        this.dataEvento = dataEvento;
    }

    public void setHoraEvento(String horaEvento) {
        this.horaEvento = horaEvento;
    }

    public void setFormaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public void setComoConheceu(ConheceuENUM comoConheceu){
        this.comoConheceu = comoConheceu;
    }



    public Cliente(InsertClienteDTO insertClienteDTO) {
        this.nomeCompleto = insertClienteDTO.nomeCompleto();
        this.cpf = insertClienteDTO.cpf();
        this.identidade = insertClienteDTO.identidade();
        this.nomeAniversariante = insertClienteDTO.nomeAniversariante();
        this.idadeAniversariante = insertClienteDTO.idadeAniversariante();
        this.endereco = insertClienteDTO.endereco();
        this.telefone = insertClienteDTO.telefone();
        this.email = insertClienteDTO.email();
        this.instagram = insertClienteDTO.instagram();
        this.enderecoEvento = insertClienteDTO.enderecoEvento();;
        this.dataEvento = insertClienteDTO.dataEvento();
        this.horaEvento = insertClienteDTO.horaEvento();
        this.formaPagamento = insertClienteDTO.formaPagamento();
        this.comoConheceu = insertClienteDTO.comoConheceu();
    }

    public void atualizar(AtualizarClienteDTO dados) {
    this.nomeCompleto = dados.nomeCompleto() != null ? dados.nomeCompleto() : this.nomeCompleto;
    this.cpf = dados.cpf() != null ? dados.cpf() : this.cpf;
        this.identidade = dados.identidade() != null ? dados.identidade() : this.identidade;
        this.nomeAniversariante = dados.nomeAniversariante() != null ? dados.nomeAniversariante() : this.nomeAniversariante;
        this.idadeAniversariante = dados.idadeAniversariante() != null ? dados.idadeAniversariante() : this.idadeAniversariante;
        this.endereco = dados.endereco() != null ? dados.endereco() : this.endereco;
        this.telefone = dados.telefone() != null ? dados.telefone() : this.telefone;
        this.email = dados.email() != null ? dados.email() : this.email;
        this.instagram = dados.instagram() != null ? dados.instagram() : this.instagram;
        this.enderecoEvento = dados.enderecoEvento() != null ? dados.enderecoEvento() : this.enderecoEvento;
        this.dataEvento = dados.dataEvento() != null ? dados.dataEvento() : this.dataEvento;
        this.horaEvento = dados.horaEvento() != null ? dados.horaEvento() : this.horaEvento;
        this.formaPagamento = dados.formaPagamento() != null ? dados.formaPagamento() : this.formaPagamento;
        this.comoConheceu = dados.comoConheceu() != null ? dados.comoConheceu() : this.comoConheceu;
    }
}
