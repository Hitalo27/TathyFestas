import { useState, useEffect } from 'react';
import { IconButton, Grid, Paper, Typography, Snackbar, TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Cliente } from '../../../types/Cliente';
import ClienteAPI from '../../../API/ClienteAPI';
import EditClienteDialog from '../../components/cliente/EdicaoClienteDialog';
import { format } from 'date-fns';

export default function ListagemCliente() {
    const [clientes, setClientesCadastrados] = useState<Cliente[]>([]);

    const [cpf, setCPF] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [dialogOpen, setDialogOpen] = useState(false);
    const [clienteEdicao, setClienteEdicao] = useState<Cliente | null>(null);

    useEffect(() => {
        const carregarClientes = async () => {
            try {
                setClientesCadastrados(await ClienteAPI.buscarTodosClientes());
            } catch (error) {
                console.error("Erro ao carregar usuários: ", error);
            }
        };

        carregarClientes();
    }, []);

    const validarFormulario = () => {
        if (!validarCPF(cpf)) {
            setSnackbarMessage('CPF inválido.');
            setSnackbarOpen(true);
            return false;
        }
        if (!validarTelefone(telefone)) {
            setSnackbarMessage('Telefone inválido.');
            setSnackbarOpen(true);
            return false;
        }
        if (!validarEmail(email)) {
            setSnackbarMessage('Email inválido.');
            setSnackbarOpen(true);
            return false;
        }
        return true;
    };

    const validarCPF = (cpf: string) => {
        const cpfSemFormatacao = cpf.replace(/[^\d]+/g, '');
        if (cpfSemFormatacao.length !== 11) {
            return false;
        }
        const cpfArray = cpfSemFormatacao.split('').map((d) => parseInt(d));
        let sum = 0;
        let factor = 10;
        for (let i = 0; i < 9; i++) {
            sum += cpfArray[i] * factor;
            factor--;
        }
        let remainder = sum % 11;
        if (remainder < 2) {
            if (cpfArray[9] !== 0) {
                return false;
            }
        } else {
            if (cpfArray[9] !== 11 - remainder) {
                return false;
            }
        }
        sum = 0;
        factor = 11;
        for (let i = 0; i < 10; i++) {
            sum += cpfArray[i] * factor;
            factor--;
        }
        remainder = sum % 11;
        if (remainder < 2) {
            if (cpfArray[10] !== 0) {
                return false;
            }
        } else {
            if (cpfArray[10] !== 11 - remainder) {
                return false;
            }
        }
        return true;
    };

    const validarTelefone = (telefone: string) => {
        return telefone.replace(/[^\d]+/g, '').length === 11;
    };

    const validarEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const handleDeletarCliente = async (id: number) => {
        try {
            await ClienteAPI.deletarCliente(id);
    
            setClientesCadastrados(await ClienteAPI.buscarTodosClientes());

            setSnackbarMessage('Usuário removido com sucesso.');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage("Erro ao remover usuário: " + error);
            setSnackbarOpen(true);
        }
    };

    const handleEdicaoCliente = (id: number) => {
        const clienteToEdit = clientes.find(u => u.id === id);

        if (clienteToEdit) {
            setClienteEdicao(clienteToEdit);
            setDialogOpen(true);
        } else {
            console.warn(`Nenhum usuário encontrado com o id ${id}`);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setClienteEdicao(null);
    };

    const handleUpdateCliente = async () => {
        if (clienteEdicao) {
            try {
                const updates = {
                    nomeCompleto: clienteEdicao.nomeCompleto,
                    cpf: clienteEdicao.cpf,
                    identidade: clienteEdicao.identidade,
                    nomeAniversariante: clienteEdicao.nomeAniversariante,
                    idadeAniversariante: clienteEdicao.idadeAniversariante,
                    endereco: clienteEdicao.endereco,
                    telefone: clienteEdicao.telefone,
                    email: clienteEdicao.email,
                    instagram: clienteEdicao.instagram,
                    enderecoEvento: clienteEdicao.enderecoEvento,
                    dataEvento: clienteEdicao.dataEvento,
                    horaEvento: clienteEdicao.horaEvento,
                    formaPagamento: clienteEdicao.formaPagamento,
                    conheceuEmpresa: clienteEdicao.comoConheceu
                };

                await ClienteAPI.atualizarClienteParcial(clienteEdicao.id, updates);

                setDialogOpen(false);
                setClienteEdicao(null);

                setClientesCadastrados(await ClienteAPI.buscarTodosClientes());

                setSnackbarMessage('Usuário editado com sucesso.');
                setSnackbarOpen(true);
            } catch (error) {
                setSnackbarMessage("Erro ao editar usuário: " + error);
                setSnackbarOpen(true)
            }
        }
    };

    return (
        <Grid container justifyContent="center" spacing={3} marginTop={1}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ padding: 4 }}>
                    <Typography variant="h6" mb={1}>
                        Clientes Cadastrados
                    </Typography>

                    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                        <Table>
                            <TableHead>
                            <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nome Completo</TableCell>
                                    <TableCell>CPF</TableCell>
                                    <TableCell>Telefone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Endereço</TableCell>
                                    <TableCell>Instagram</TableCell>
                                    <TableCell>Data do Evento</TableCell>
                                    <TableCell>Hora do Evento</TableCell>
                                    <TableCell>Forma de Pagamento</TableCell>
                                    <TableCell>Como Conheceu</TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clientes.map((cliente, index) => (
                                    <TableRow key={cliente.id}
                                    sx={{ '&:hover': { backgroundColor: '#fafafa' }, backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                                         
                                        <TableCell>{cliente.id}</TableCell>
                                        <TableCell>{cliente.nomeCompleto}</TableCell>
                                        <TableCell>{cliente.cpf}</TableCell>
                                        <TableCell>{cliente.telefone}</TableCell>
                                        <TableCell>{cliente.email}</TableCell>
                                        <TableCell>{cliente.endereco}</TableCell>
                                        <TableCell>{cliente.instagram}</TableCell>
                                        <TableCell>{cliente.dataEvento ? format(cliente.dataEvento, 'dd/MM/yyyy') : ''}</TableCell>
                                        <TableCell>{cliente.horaEvento}</TableCell>
                                        <TableCell>{cliente.formaPagamento}</TableCell>
                                        <TableCell>{cliente.comoConheceu}</TableCell>
                                        <TableCell>
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdicaoCliente(cliente.id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeletarCliente(cliente.id)}>
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

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />

            <EditClienteDialog
                dialogOpen={dialogOpen}
                clienteEdicao={clienteEdicao}
                handleDialogClose={handleDialogClose}
                handleUpdateCliente={handleUpdateCliente}
                setClienteEdicao={setClienteEdicao}
            />
        </Grid>
    );
}
