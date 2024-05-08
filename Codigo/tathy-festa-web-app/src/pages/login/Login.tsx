import { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Link } from '@mui/material';
import AuthenticationAPI from '@/API/AuthenticationAPI';
import { PageContext } from '@/types/enums/PageContext';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Breadcrumbs, { BreadcrumbLink } from '../components/visuals/Breadcrumbs';

const DynamicLayout = dynamic(() => import('@/app/layout'), { ssr: false });

type LoginProps = {
    setCurrentContent: (content: PageContext) => void;
};

export default function Login({ setCurrentContent }: LoginProps) {
    const [usuario, setUsuario] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [erroAutenticacao, setErroAutenticacao] = useState<string>('');

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await AuthenticationAPI.loginUsuario(usuario, senha);

            localStorage.setItem('jwtToken', response.data.token);

            window.location.href = '/';
        } catch (err) {
            setErroAutenticacao('Credenciais inválidas. Verifique se seu usuário ou senha estão corretos');
        }
    };

    const handleNavigation = (path: PageContext) => {
        router.push(path as any);
    };

    const breadcrumbLinks: BreadcrumbLink[] = [
        { text: 'Home', pageContext: PageContext.Home },
        { text: 'Login', onClick: () => { } },
    ];

    return (
        <DynamicLayout>
            <Grid container justifyContent="center" style={{ marginTop: '50px' }}>
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: '40px', textAlign: 'center' }}>
                        <Breadcrumbs links={breadcrumbLinks} />

                        <Typography variant="h4" style={{ marginBottom: '20px' }}>
                            Login
                        </Typography>

                        {erroAutenticacao && <Typography color="error">{erroAutenticacao}</Typography>}

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
                            label="Senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: '20px', backgroundColor: '#1976d2' }}>
                            Login
                        </Button>

                        {/* <div style={{ marginTop: '20px' }}>
                            <Link style={{ marginRight: '20px' }} onClick={() => handleNavigation(PageContext.EsqueciSenha)}>
                                Esqueci minha senha
                            </Link>
                            <Link onClick={() => handleNavigation(PageContext.CadastroUsuario)}>
                                Criar uma conta
                            </Link>
                        </div> */}
                    </Paper>
                </Grid>
            </Grid>
        </DynamicLayout>
    );
}
