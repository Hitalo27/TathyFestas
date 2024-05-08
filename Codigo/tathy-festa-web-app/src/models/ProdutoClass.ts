import { Produto } from "@/types/Produto";

export default class ProdutoClass implements Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagens: string[];
  categoria: string;
  quantidadeEstoque: number;
  quantidadeBaixa: number;

  constructor(produto: Produto) {
    this.id = produto.id || 0;
    this.nome = produto.nome;
    this.descricao = produto.descricao;
    this.preco = produto.preco;
    this.imagens = produto.imagens || [];
    this.categoria = produto.categoria;
    this.quantidadeEstoque = produto.quantidadeEstoque;
    this.quantidadeBaixa = produto.quantidadeBaixa;
  }

  mapToObject() {
    return {
      id: this.id,
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      imagens: this.imagens,
      categoria: this.categoria,
      quantidadeEstoque: this.quantidadeEstoque,
      quantidadeBaixa: this.quantidadeBaixa,
    };
  }

  static criarNovoProduto(produto: Omit<Produto, "id">): ProdutoClass {
    return new ProdutoClass({ ...produto, id: 0 });
  }

  static async converterArquivoParaByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result)
          resolve(new Uint8Array(event.target.result as ArrayBuffer));
        else
          reject(new Error("Falha ao converter imagem do produto para byte[]"));
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    });
  }
}
