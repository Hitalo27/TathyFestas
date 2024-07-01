import axios from "../lib/apiConfig";
import { AxiosResponse } from 'axios';
import ProdutoClass from "@/models/ProdutoClass";
import { Produto } from "@/types/Produto";

class ProdutoAPI {
  static async criarProduto(produto: Produto): Promise<AxiosResponse<any>> {
    console.log(produto);
    return await axios.post("/produtos", produto);
  }

static async buscarTodosProdutos(): Promise<AxiosResponse<any>> {
  try {
    const resposta = await axios.get("/produtos");
    return resposta;
  } catch (erro) {
    console.error("Erro ao buscar produtos:", erro);
    throw erro;
  }
}
//
//   static async buscarTodosProdutos(): Promise<AxiosResponse<any>> {
//     const response = await axios.get("/api/produtos");
//     console.log(response.data); // log the response data
//     const listaProdutos = response.data.map((produto: any) => {
//       console.log(produto); // log the product object
//       return new ProdutoClass(produto);
//     });
//     return response;
//   }


  static async buscarProdutoPorId(id: number): Promise<AxiosResponse<any>> {
    return await axios.get(`/produtos/${id}`);
  }

  //TODO talvez 'name' esteja deprecado
  static async pesquisarProdutos(query: string): Promise<AxiosResponse<any>> {
    return await axios.get(`/produtos?nome=${query}`);
  }

  static async buscarItensEstoque(): Promise<AxiosResponse<any>> {
    return await axios.get("/itens");
  }



static async adicionarNovoItem(nome: String, quantidade: number): Promise<AxiosResponse<any>> {
  return await axios.post("/itens", {nome, quantidade});
} 

static async deletarItem(id: number): Promise<AxiosResponse<any>> {
      return await axios.delete(`/itens/${id}`)

};

static async incrementarQuantidadeItem(id: number): Promise<AxiosResponse<any>> {
  return await axios.put(`/itens/incrementar/${id}`);
} 

static async decrementarQuantidadeItem(id: number): Promise<AxiosResponse<any>> {
  return await axios.put(`/itens/decrementar/${id}`);
} 

}

export default ProdutoAPI;
