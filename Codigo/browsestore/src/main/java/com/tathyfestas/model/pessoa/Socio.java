package com.tathyfestas.model.pessoa;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;


@Entity
@Table(name = "socio")
public class Socio extends Pessoa {
    private String numeroAssociado;
    private Date dataAssociacao;
    private double valorContribuicao;

    public Socio() {
    }

    public String getNumeroAssociado() {
        return numeroAssociado;
    }

    public void setNumeroAssociado(String numeroAssociado) {
        this.numeroAssociado = numeroAssociado;
    }

	@DateTimeFormat(pattern ="dd/mm/yyyy")
    public Date getDataAssociacao() {
        return dataAssociacao;
    }

    public void setDataAssociacao(Date dataAssociacao) {
        this.dataAssociacao = dataAssociacao;
    }

    public double getValorContribuicao() {
        return valorContribuicao;
    }

    public void setValorContribuicao(double valorContribuicao) {
        this.valorContribuicao = valorContribuicao;
    }
}
