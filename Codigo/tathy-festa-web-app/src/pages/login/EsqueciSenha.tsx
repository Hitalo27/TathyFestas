import { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Link } from '@mui/material';
import AuthenticationAPI from '@/API/AuthenticationAPI';
import { PageContext } from '@/types/enums/PageContext';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Breadcrumbs, { BreadcrumbLink } from '../components/visuals/Breadcrumbs';

const DynamicLayout = dynamic(() => import('@/app/layout'), { ssr: false });

type EsqueciSenhaProps = {
    setCurrentContent: (content: PageContext) => void;
};

export default function EsqueciSenha({ setCurrentContent }: EsqueciSenhaProps) {
    const [email, setEmail] = useState<string>('');
    const [mensagem, setMensagem] = useState<string>('');

    const router = useRouter();

    const handleRedefinirSenha = async () => {
        try {
            await AuthenticationAPI.esqueciSenha(email);

            setMensagem('Enviamos um email com o link de redefinição de senha. Verifique a sua caixa de entrada!');
        } catch (err) {
            setMensagem('Erro ao enviar email. Por favor valide se inseriu o email correto associado à sua conta.');
        }
    };

    const handleNavigation = (path: PageContext) => {
        router.push(path as any);
    };

    const breadcrumbLinks: BreadcrumbLink[] = [
        { text: 'Home', pageContext: PageContext.Home },
        { text: 'Login', pageContext: PageContext.Login },
        { text: 'Esqueci Senha', onClick: () => { } },
    ];

    return (
        <DynamicLayout>
            <Grid container justifyContent="center" style={{ marginTop: '50px' }}>
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: '40px', textAlign: 'center' }}>
                        <Breadcrumbs links={breadcrumbLinks} />

                        <Typography variant="h4" style={{ marginBottom: '20px', marginTop: '20px' }}>
                            Esqueci minha senha
                        </Typography>

                        {mensagem && <Typography color={mensagem.startsWith('Error') ? 'error' : 'primary'}>{mensagem}</Typography>}

                        <Typography variant="body1" style={{ marginBottom: '20px' }}>
                            Insira o seu endereço de email e lhe enviaremos um link para redefinir a sua senha.
                        </Typography>

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button variant="contained" color="primary" onClick={handleRedefinirSenha} style={{ marginTop: '20px', backgroundColor: '#1976d2' }}>
                            Redefinir Senha
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </DynamicLayout>
    );
}
