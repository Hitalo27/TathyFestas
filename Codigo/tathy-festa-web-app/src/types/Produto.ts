export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    imagens: string[];
    categoria: string;
    quantidadeEstoque: number;
    quantidadeBaixa: number;
}
