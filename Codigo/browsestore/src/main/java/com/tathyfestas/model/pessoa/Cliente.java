package com.tathyfestas.model.pessoa;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;



@Entity
@Table(name = "cliente")
public class Cliente extends Pessoa {
    private Date dataCadastroCliente;
    private boolean contaAtiva;

    public Cliente() {
    }

	public Date getDataCadastroCliente() {
		return dataCadastroCliente;
	}

	public void setDataCadastroCliente(Date dataCadastroCliente) {
		this.dataCadastroCliente = dataCadastroCliente;
	}

	public boolean isContaAtiva() {
		return contaAtiva;
	}

	public void setContaAtiva(boolean contaAtiva) {
		this.contaAtiva = contaAtiva;
	}
    
}
