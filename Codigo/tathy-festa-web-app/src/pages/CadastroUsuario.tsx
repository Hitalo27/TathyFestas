import { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Snackbar, Box, Link } from '@mui/material';
import { Usuario } from '../types/Usuario';
import UsuarioAPI from '../API/UsuarioAPI';
import UsuarioClass from '../models/UsuarioClass';
import { Permissao } from '../types/enums/Permissao';
import { PageContext } from '@/types/enums/PageContext';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Breadcrumbs, { BreadcrumbLink } from '../pages/components/visuals/Breadcrumbs';

const DynamicLayout = dynamic(() => import('@/app/layout'), { ssr: false });

type CadastroUsuarioProps = {
    setCurrentContent: (content: PageContext) => void;
};

export default function CadastroUsuario({ setCurrentContent }: CadastroUsuarioProps) {
    const [usuarios, setUsuariosCadastrados] = useState<Usuario[]>([]);

    const [usuario, setUsuario] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState<string>('');

    const [emailError, setEmailError] = useState<string>('');
    const [senhaError, setSenhaError] = useState<string>('');

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const router = useRouter();

    const breadcrumbLinks: BreadcrumbLink[] = [
        { text: 'Home', pageContext: PageContext.Home },
        { text: 'Login', pageContext: PageContext.Login },
        { text: 'Cadastro', onClick: () => { } },
    ];

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

    const handleCadastrarUsuario = async () => {
        if (validarFormulario()) {
            const usuarioDTO = new UsuarioClass(usuario, senha, Permissao.USUARIO, email);

            try {
                await UsuarioAPI.criarUsuario(usuarioDTO);

                setUsuariosCadastrados(await UsuarioAPI.buscarTodosUsuarios());

                setUsuario('');
                setEmail('');
                setSenha('');
                setSenhaConfirmacao('');

                setSnackbarMessage('Usuário cadastrado com sucesso.');
                setSnackbarOpen(true);
            } catch (error) {
                setSnackbarMessage('Erro ao cadastrar usuario: ' + error);
                setSnackbarOpen(true);
            }
        }
    };

    const validarFormulario = () => {
        let valid = true;
        if (!usuario || !email || !senha || !senhaConfirmacao) {
            setSnackbarMessage('Preencha todos os campos.');
            setSnackbarOpen(true);
            valid = false;
        }

        if (!validarEmail(email)) {
            setEmailError('E-mail inválido.');
            valid = false;
        } else {
            setEmailError('');
        }

        // // Validação de complexidade de senha
        // if (!validarSenha(senha)) {
        //     setSenhaError('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
        //     valid = false;
        // } else if (senha !== senhaConfirmacao) {
        //     setSenhaError('As senhas não coincidem.');
        //     valid = false;
        // } else {
        //     setSenhaError('');
        // }

        return valid;
    }

    const validarEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const validarSenha = (senha: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(senha);
    };

    return (
        <DynamicLayout>
            <Grid container justifyContent="center" spacing={3} marginTop={1}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 4 }}>
                        <Breadcrumbs links={breadcrumbLinks} />

                        <Typography variant="h4" style={{ marginBottom: '20px', marginTop: '20px' }} textAlign="center">
                            Cadastro de Usuário
                        </Typography>

                        <Box mb={3}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Usuário"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!emailError}
                                helperText={emailError}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Senha"
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                error={!!senhaError}
                                helperText={senhaError}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Confirme a Senha"
                                type="password"
                                value={senhaConfirmacao}
                                onChange={(e) => setSenhaConfirmacao(e.target.value)}
                                error={!!senhaError}
                                helperText={senhaError}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2, backgroundColor: '#1976d2 !important' }}
                                onClick={handleCadastrarUsuario}
                            >
                                Adicionar Usuário
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                />
            </Grid>
        </DynamicLayout>
    );
}
