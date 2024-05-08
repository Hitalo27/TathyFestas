import { useState, useEffect } from 'react';
import { IconButton, Grid, Paper, Typography, Snackbar, TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Usuario } from '../../../types/Usuario';
import UsuarioAPI from '../../../API/UsuarioAPI';
import EditUsuarioDialog from '../../components/usuario/EdicaoUsuarioDialog';

export default function ListagemUsuario() {
    const [usuarios, setUsuariosCadastrados] = useState<Usuario[]>([]);

    const [usuario, setUsuario] = useState<string>('');
    const [senha, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [dialogOpen, setDialogOpen] = useState(false);
    const [usuarioEdicao, setUsuarioEdicao] = useState<Usuario | null>(null);

    useEffect(() => {
        const carregarUsuarios = async () => {
            try {
                setUsuariosCadastrados(await UsuarioAPI.buscarTodosUsuarios());
            } catch (error) {
                console.error("Erro ao carregar usuários: ", error);
            }
        };

        carregarUsuarios();
    }, []);

    const validarFormulario = async () => {
        if (!usuario || !email || !senha) {
            setSnackbarMessage('Preencha todos os campos.');
            setSnackbarOpen(true);
            return;
        }

        if (!validarEmail(email)) {
            setSnackbarMessage('E-mail inválido.');
            setSnackbarOpen(true);
            return;
        }
    }

    const validarEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const handleDeletarUsuario = async (id: number) => {
        try {
            await UsuarioAPI.deletarUsuario(id);

            setUsuariosCadastrados(await UsuarioAPI.buscarTodosUsuarios());

            setSnackbarMessage('Usuário removido com sucesso.');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage("Erro ao remover usuário: " + error);
            setSnackbarOpen(true);
        }
    };

    const handleEdicaoUsuario = (id: number) => {
        const usuarioToEdit = usuarios.find(u => u.id === id);

        if (usuarioToEdit) {
            setUsuarioEdicao(usuarioToEdit);
            setDialogOpen(true);
        } else {
            console.warn(`Nenhum usuário encontrado com o id ${id}`);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setUsuarioEdicao(null);
    };

    const handleUpdateUsuario = async () => {
        if (usuarioEdicao) {
            try {
                const updates = {
                    email: usuarioEdicao.email,
                    permissao: usuarioEdicao.permissao
                };

                await UsuarioAPI.atualizarUsuarioParcial(usuarioEdicao.id, updates);

                setDialogOpen(false);
                setUsuarioEdicao(null);

                setUsuariosCadastrados(await UsuarioAPI.buscarTodosUsuarios());

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
                        Usuários Cadastrados
                    </Typography>

                    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>Usuário</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>Permissão</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f1f1f1' }}>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usuarios.map((usuario, index) => (
                                    <TableRow
                                        key={usuario.id}
                                        sx={{ '&:hover': { backgroundColor: '#fafafa' }, backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}
                                    >
                                        <TableCell>{usuario.id}</TableCell>
                                        <TableCell>{usuario.usuario}</TableCell>
                                        <TableCell>{usuario.email}</TableCell>
                                        <TableCell>{usuario.permissao}</TableCell>
                                        <TableCell>
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdicaoUsuario(usuario.id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeletarUsuario(usuario.id)}>
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

            <EditUsuarioDialog
                dialogOpen={dialogOpen}
                usuarioEdicao={usuarioEdicao}
                handleDialogClose={handleDialogClose}
                handleUpdateUsuario={handleUpdateUsuario}
                setUsuarioEdicao={setUsuarioEdicao}
            />
        </Grid>
    );
}
