import axios, { AxiosResponse } from "axios";
import "../lib/apiConfig";
import ProdutoClass from "@/models/ProdutoClass";
import { Produto } from "@/types/Produto";

class ProdutoAPI {
  static async criarProduto(produto: Produto): Promise<AxiosResponse<any>> {
    console.log(produto);
    return await axios.post("/api/produtos", produto);
  }

static async buscarTodosProdutos(): Promise<AxiosResponse<any>> {
  try {
    const resposta = await axios.get("/api/produtos");
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
    return await axios.get(`/api/produtos/${id}`);
  }

  //TODO talvez 'name' esteja deprecado
  static async pesquisarProdutos(query: string): Promise<AxiosResponse<any>> {
    return await axios.get(`/api/produtos?nome=${query}`);
  }

  static async buscarItensEstoque(): Promise<AxiosResponse<any>> {
    return await axios.get("/api/itens");
  }



static async adicionarNovoItem(nome: String, quantidade: number): Promise<AxiosResponse<any>> {
  return await axios.post("/api/itens", {nome, quantidade});
} 

static async deletarItem(id: number): Promise<AxiosResponse<any>> {
      return await axios.delete(`/api/itens/${id}`)

};

static async incrementarQuantidadeItem(id: number): Promise<AxiosResponse<any>> {
  return await axios.put(`/api/itens/incrementar/${id}`);
} 

static async decrementarQuantidadeItem(id: number): Promise<AxiosResponse<any>> {
  return await axios.put(`/api/itens/decrementar/${id}`);
} 

}

export default ProdutoAPI;
