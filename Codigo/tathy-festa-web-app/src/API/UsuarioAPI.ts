import axios from "axios";
import { Usuario } from "../types/Usuario";
import "../lib/apiConfig";
import UsuarioClass from "@/models/UsuarioClass";

class UsuarioAPI {
  static async buscarTodosUsuarios(): Promise<Usuario[]> {
    const response = await axios.get<Usuario[]>("/api/usuarios");
    return response.data;
  }

  static async criarUsuario(usuario: UsuarioClass): Promise<void> {
    await axios.post("/api/usuarios", usuario.mapToObject());
  }

  static async deletarUsuario(id: number): Promise<void> {
    await axios.delete(`/api/usuarios/${id}`);
  }

  static async atualizarUsuarioParcial(
    id: number,
    updates: any
  ): Promise<void> {
    await axios.patch(`/api/usuarios/${id}`, updates);
  }

  static async buscarPermissaoUsuario(id: number): Promise<string> {
    const response = await axios.get(`/api/usuarios/permissao/${id}`);
    return response.data;
  }
}

export default UsuarioAPI;
