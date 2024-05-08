import { Permissao } from "./enums/Permissao";

export interface Usuario {
  id: number;
  usuario: string;
  senha: string;
  permissao: Permissao;
  email: string;
}
