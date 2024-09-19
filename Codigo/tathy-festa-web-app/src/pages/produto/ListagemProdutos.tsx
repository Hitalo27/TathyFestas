import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TablePagination, Box, Switch, FormControlLabel,
  Table, TableBody, TableCell, TableHead, TableRow, Button, CircularProgress
} from '@mui/material';
import ProdutoClass from '../../models/ProdutoClass';
import ProdutoAPI from '../../API/ProdutoAPI';
import SearchBar from '../../components/produto/SearchBar';
import ProdutoCardGrid from '../../components/produto/ProdutoCardGrid';
import dynamic from 'next/dynamic';
import Breadcrumbs, { BreadcrumbLink } from '../../components/visuals/Breadcrumbs';
import { PageContext } from '@/types/enums/PageContext';

const DynamicLayout = dynamic(() => import('@/app/layout'), { ssr: false });

export default function ListagemProdutos() {
  const [produtos, setProdutos] = useState<ProdutoClass[]>([]);
  const [totalProdutos, setTotalProdutos] = useState<number>(0); 3
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isCardView, setIsCardView] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

  const breadcrumbLinks: BreadcrumbLink[] = [
    { text: 'Home', pageContext: PageContext.Home },
    { text: 'Listagem Produtos', pageContext: PageContext.ListagemProdutos },
  ];

  const toggleView = () => {
    setIsCardView(!isCardView);
  };

  useEffect(() => {
    const buscarProdutos = async () => {
      setIsLoading(true); // Define isLoading como true ao iniciar a busca

      try {
        const response = await ProdutoAPI.buscarProdutosPaginacao(page, rowsPerPage);
    
        const listaProdutos = response.data.content.map((produto: any) => new ProdutoClass(produto));

        setProdutos(listaProdutos);
        setTotalProdutos(response.data.totalElements);
     } catch (error) {
        console.error('Erro ao buscar decoração:', error);
      } finally {
        setIsLoading(false); // Define isLoading como false ao finalizar a busca
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
    setProdutos(produtosFiltrados);
  };

  const onSearch = async (query: string) => {
    setIsLoading(true); // Define isLoading como true ao iniciar a busca

    try {
      const response = await ProdutoAPI.pesquisarProdutos(query);

      const produtosPesquisa = response.data.map((produto: any) => new ProdutoClass(produto));

      setProdutos(produtosPesquisa);
      setTotalProdutos(response.data.totalElements);
      setPage(0);
  
    } catch (error) {
      console.error('Erro ao buscar decoração:', error);
    } finally {
      setIsLoading(false); // Define isLoading como false ao finalizar a busca
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
          <Breadcrumbs links={breadcrumbLinks} />
        </Box>

        <SearchBar onInstantSearch={onInstantSearch} onSearch={onSearch} />

        {isLoading ? ( // Mostra indicador de carregamento se isLoading for true
          <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <CircularProgress />
            <Typography variant="body1" mt={2}>Carregando...</Typography>
          </Box>
        ) : (
          isCardView ? (
            <ProdutoCardGrid produtos={produtos} />
          ) : (
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
                  {produtos.map(produto => (
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
          )
        )}

        <TablePagination
          component="div"
          count={totalProdutos}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage="Avaliações por página:"
        />
      </Container>
    </DynamicLayout>
  );
}
