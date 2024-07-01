import axios from "axios";
import ClienteClass from "@/models/ClienteClass";
import "../lib/apiConfig";
import { Cliente } from "@/types/Cliente";

class ClienteAPI {

  static async criarCliente(cliente: ClienteClass): Promise<void> {
    await axios.post("/clientes", cliente.mapToObject());
  }

  
  static async buscarClientePorId(id: number): Promise<void> {
     await axios.get(`/clientes/${id}`);
  }


  static async buscarTodosClientes(): Promise<Cliente[]> {
    const response = await axios.get<Cliente[]>("/clientes");
    return response.data;
  }

  static async deletarCliente(id: number): Promise<void> {
    await axios.delete(`/clientes/${id}`);
  }

  static async atualizarClienteParcial(
    id: number,
    updates: any
  ): Promise<void> {
    await axios.patch(`/clientes/${id}`, updates);
  }

}

export default ClienteAPI;
