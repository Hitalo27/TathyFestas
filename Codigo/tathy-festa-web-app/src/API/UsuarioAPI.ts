import axios from "axios";
import { Usuario } from "../types/Usuario";
import "../lib/apiConfig";
import UsuarioClass from "@/models/UsuarioClass";

class UsuarioAPI {
  static async buscarTodosUsuarios(): Promise<Usuario[]> {
    const response = await axios.get<Usuario[]>("/usuarios");
    return response.data;
  }

  static async criarUsuario(usuario: UsuarioClass): Promise<void> {
    await axios.post("/usuarios", usuario.mapToObject());
  }

  static async deletarUsuario(id: number): Promise<void> {
    await axios.delete(`/usuarios/${id}`);
  }

  static async atualizarUsuarioParcial(
    id: number,
    updates: any
  ): Promise<void> {
    await axios.patch(`/usuarios/${id}`, updates);
  }

  static async buscarPermissaoUsuario(id: number): Promise<string> {
    const response = await axios.get(`/usuarios/permissao/${id}`);
    return response.data;
  }
}

export default UsuarioAPI;
