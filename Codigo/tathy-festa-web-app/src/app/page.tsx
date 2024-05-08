'use client'

import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TablePagination, Box, Switch, FormControlLabel,
  Table, TableBody, TableCell, TableHead, TableRow, Button
} from '@mui/material';
import ProdutoClass from '@/models/ProdutoClass';
import ProdutoAPI from '@/API/ProdutoAPI';
import SearchBar from '@/pages/components/produto/SearchBar';
import ProdutoCardGrid from '@/pages/components/produto/ProdutoCardGrid';
import dynamic from 'next/dynamic';;


export default function HomePage() {

  const DynamicLayout = dynamic(() => import('@/app/layout'), { ssr: false });

  const [produtos, setProdutos] = useState<ProdutoClass[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<ProdutoClass[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isTableView, setIsTableView] = useState(true);

  const toggleView = () => {
    setIsTableView(!isTableView);
  };
  
  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await ProdutoAPI.buscarTodosProdutos();
  
        const listaProdutos = response.data.map((produto: any) => new ProdutoClass(produto));
  
        setProdutos(listaProdutos);
  
        setProdutosFiltrados(listaProdutos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
  
    buscarProdutos();
  }, [page, rowsPerPage]);
  
  const onPageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  
    setPage(0);
  };
  
  const onInstantSearch = (query: string) => {
    const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(query.toLowerCase()));
  
    setProdutosFiltrados(produtosFiltrados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
  };
  
  const onSearch = async (query: string) => {
    try {
      const response = await ProdutoAPI.pesquisarProdutos(query);
  
      const produtosPesquisa = response.data.map((produto: any) => new ProdutoClass(produto));
  
      setProdutos(produtosPesquisa);
  
      setPage(0);
  
      setProdutosFiltrados(produtosPesquisa.slice(0, rowsPerPage));
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };
      return (
        <DynamicLayout>
          <Container>
            <Box sx={{
              paddingTop: '22px',
              marginLeft: -10,
              marginBottom: '30px',
            }}>
            </Box>
    
            <SearchBar onInstantSearch={onInstantSearch} onSearch={onSearch} />
    
            <FormControlLabel
              control={<Switch checked={isTableView} onChange={toggleView} color="primary" />}
              label={isTableView ? "Table View" : "Card View"}
            />
    
            {isTableView ? (
              <Box mt={4}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Descrição</TableCell>
                      <TableCell>Preco</TableCell>
                      <TableCell>Categoria</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {produtosFiltrados.map(produto => (
                      <TableRow key={produto.id}>
                        <TableCell>{produto.nome}</TableCell>
                        <TableCell>{produto.descricao}</TableCell>
                        <TableCell>${produto.preco}</TableCell>
                        <TableCell>{produto.categoria}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary" href={`/produto/${produto.id}`}>
                            Ver produto
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            ) : (
              <ProdutoCardGrid produtos={produtosFiltrados} />
            )}
    
            <TablePagination
              component="div"
              count={produtos.length}
              page={page}
              onPageChange={onPageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          </Container>
        </DynamicLayout>
      );
    }

