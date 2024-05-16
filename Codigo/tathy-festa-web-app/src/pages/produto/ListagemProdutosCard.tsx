import React, { useState, useEffect } from 'react';
import { Container, Stack, Typography, TablePagination } from '@mui/material';
import ProdutoCardGrid from '../../components/produto/ProdutoCardGrid';
import ProdutoClass from '../../models/ProdutoClass';
import { Produto } from "@/types/Produto";
import ProdutoAPI from '../../API/ProdutoAPI';
import SearchBar from '../../components/produto/SearchBar';

export default function ProductsPage() {
  const [produtos, setProdutos] = useState<ProdutoClass[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<ProdutoClass[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await ProdutoAPI.buscarTodosProdutos();
        console.log(response);
        const listaProdutos = response.data.map((produto: any) => new ProdutoClass(produto));
        setProdutos(listaProdutos);
        setProdutosFiltrados(listaProdutos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    buscarProdutos();
  }, [page, rowsPerPage]);

  const onInstantSearch = (query: string) => {
    const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(query.toLowerCase()));
    setProdutosFiltrados(produtosFiltrados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
  };

  const onSearch = async (query: string) => {
    try {
      const response = await ProdutoAPI.pesquisarProdutos(query);
      const produtosPesquisa = response.data.map((produto: any) => new ProdutoClass(produto));
      setProdutos(produtosPesquisa);
      setProdutosFiltrados(produtosPesquisa.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const onPageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <SearchBar onInstantSearch={onInstantSearch} onSearch={onSearch} />

        <ProdutoCardGrid produtos={produtosFiltrados} />

        <TablePagination
          component="div"
          count={produtos.length}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Container>
    </>
  );
}
