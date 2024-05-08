import { Usuario } from '@/types/Usuario';
import { Permissao } from '@/types/enums/Permissao';

export default class UsuarioClass implements Usuario {
  id: number;
  usuario: string;
  senha: string;
  permissao: Permissao;
  email: string;

  constructor(
    usuario: string,
    senha: string,
    permissao: Permissao,
    email: string,
    id?: number,
  ) {
    this.usuario = usuario;
    this.senha = senha;
    this.permissao = permissao;
    this.email = email;

    if (id)
      this.id = id;
    else
      this.id = 0;
  }

  mapToObject() {
    return {
      id: this.id,
      usuario: this.usuario,
      senha: this.senha,
      permissao: this.permissao,
      email: this.email,
    };
  }
}
