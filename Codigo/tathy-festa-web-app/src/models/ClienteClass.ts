import { Cliente } from '@/types/Cliente';

export default class ClienteClass implements Cliente {
  id: number;
  nomeCompleto: string;
  cpf: string;
  identidade: string;
  nomeAniversariante: string;
  idadeAniversariante: string;
  endereco: string;
  telefone: string;
  email: string;
  instagram: string;
  enderecoEvento: string;
  dataEvento: Date;
  horaEvento: string;
  formaPagamento: string;
  comoConheceu: string;

  constructor(
    nomeCompleto: string,
    cpf: string,
    identidade: string,
    nomeAniversariante: string,
    idadeAniversariante: string,
    endereco: string,
    telefone: string,
    email: string,
    instagram: string,
    enderecoEvento: string,
    dataEvento: Date,
    horaEvento: string,
    formaPagamento: string,
    comoConheceu: string,
    id?: number
  ) {
    this.nomeCompleto = nomeCompleto;
    this.cpf = cpf;
    this.identidade = identidade;
    this.nomeAniversariante = nomeAniversariante;
    this.idadeAniversariante = idadeAniversariante;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
    this.instagram = instagram;
    this.enderecoEvento = enderecoEvento;
    this.dataEvento = dataEvento;
    this.horaEvento = horaEvento;
    this.formaPagamento = formaPagamento;
    this.comoConheceu = comoConheceu;

    if (id) {
      this.id = id;
    } else {
      this.id = 0;
    }
  }

  mapToObject() {
    return {
      id: this.id,
      nomeCompleto: this.nomeCompleto,
      cpf: this.cpf,
      identidade: this.identidade,
      nomeAniversariante: this.nomeAniversariante,
      idadeAniversariante: this.idadeAniversariante,
      endereco: this.endereco,
      telefone: this.telefone,
      email: this.email,
      instagram: this.instagram,
      enderecoEvento: this.enderecoEvento,
      dataEvento: this.dataEvento,
      horaEvento: this.horaEvento,
      formaPagamento: this.formaPagamento,
      comoConheceu: this.comoConheceu,
    };
  }
}
