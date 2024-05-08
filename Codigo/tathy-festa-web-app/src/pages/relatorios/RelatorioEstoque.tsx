import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { AxiosResponse } from 'axios';
import ProdutoAPI from '../../API/ProdutoAPI';
import type { RelatorioEstoque } from '../../types/RelatorioEstoque';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RelatorioEstoque() {
    const [itensRelatorio, setItensRelatorio] = useState<RelatorioEstoque[]>([]);
    const [quantidadeEstoqueItem, setQuantidadeEstoqueItem] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [novoItem, setNovoItem] = useState<{ nome: string; quantidade: number; }>({ nome: '', quantidade: 0 });

    useEffect(() => {
        const carregarRelatorio = async () => {
            try {
                const response: AxiosResponse<any> = await ProdutoAPI.buscarItensEstoque();
                setItensRelatorio(response.data);

                const total = response.data.reduce((acc: any, item: { quantidadeEstoque: any; }) => acc + item.quantidadeEstoque, 0);
                setQuantidadeEstoqueItem(total);
            } catch (error) {
                console.error("Erro ao carregar relatório: ", error);
            }
        };

        carregarRelatorio();
    }, []);

    const adicionarItem = async () => {
        try {
            await ProdutoAPI.adicionarNovoItem(novoItem.nome, novoItem.quantidade);
            const updatedItems = await atualizarRelatorio();
            setItensRelatorio(updatedItems);
            setOpenDialog(false);
        } catch (error) {
            console.error("Erro ao adicionar item ao estoque: ", error);
        }
    };

    const atualizarRelatorio = async () => {
        try {
            const response: AxiosResponse<any> = await ProdutoAPI.buscarItensEstoque();
            const total = response.data.reduce((acc: any, item: { quantidadeEstoque: any; }) => acc + item.quantidadeEstoque, 0);
            setQuantidadeEstoqueItem(total);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar relatório: ", error);
            return [];
        }
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNovoItem((prevItem) => ({
            ...prevItem,
            [name]: value
        }));
    };

    const incrementarQuantidade = async (id: number) => {
        try {
            await ProdutoAPI.incrementarQuantidadeItem(id);
            const updatedItems = await atualizarRelatorio();
            setItensRelatorio(updatedItems);
        } catch (error) {
            console.error("Erro ao incrementar quantidade do item: ", error);
        }
    };

    const decrementarQuantidade = async (id: number) => {
        try {
            await ProdutoAPI.decrementarQuantidadeItem(id);
            const updatedItems = await atualizarRelatorio();
            setItensRelatorio(updatedItems);
        } catch (error) {
            console.error("Erro ao decrementar quantidade do item: ", error);
        }
    };

    const deletarItem = async (id: number) => {
        try {
            await ProdutoAPI.deletarItem(id);
            
            const updatedItemsResponse: AxiosResponse<any> = await ProdutoAPI.buscarItensEstoque();
            
            setItensRelatorio(updatedItemsResponse.data);
        } catch (error) {
            console.error("Erro ao apagar item: ", error);
        }
    };

    return (
        <Grid container justifyContent="center" spacing={3} marginTop={1}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ padding: 4 }}>
                    <Typography variant="h6" mb={1}>
                        Relatório de Estoque
                    </Typography>
                    <Button variant="contained" onClick={handleDialogOpen}>Adicionar Item</Button>
                    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>Nome</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>Quantidade em Estoque</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itensRelatorio
                                    .sort((a, b) => a.id - b.id)
                                    .map((item) => (
                                        <TableRow
                                            key={item.id}
                                            sx={{ '&:hover': { backgroundColor: '#fafafa' }, backgroundColor: item.id % 2 === 0 ? '#ffffff' : '#f9f9f9' }}
                                        >
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.nome}</TableCell>
                                            <TableCell>
                                                <IconButton aria-label="decrementar" onClick={() => decrementarQuantidade(item.id)}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                {item.quantidadeEstoque}
                                                <IconButton aria-label="incrementar" onClick={() => incrementarQuantidade(item.id)}>
                                                    <AddIcon />
                                                </IconButton>
                                                <IconButton aria-label="apagar" onClick={() => deletarItem(item.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>

            {/* Diálogo para adicionar novo item */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Adicionar Novo Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        name="nome"
                        label="Nome"
                        fullWidth
                        value={novoItem.nome}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="quantidade"
                        name="quantidade"
                        label="Quantidade"
                        type="number"
                        fullWidth
                        value={novoItem.quantidade}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancelar</Button>
                    <Button onClick={adicionarItem}>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
