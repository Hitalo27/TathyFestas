import { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import AuthenticationAPI from '@/API/AuthenticationAPI';

export default function RedefinirSenha() {
    const [token, setToken] = useState<string | null>(null);
    const [senha, setSenha] = useState<string>('');
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');
    const [mensagem, setMensagem] = useState<string>('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        setToken(urlParams.get('token'));
    }, []);

    const handleRedefinicaoSenha = async () => {
        if (senha !== confirmarSenha) {
            setMensagem("As senhas não são idênticas!");
            return;
        }

        if (token) {
            try {
                await AuthenticationAPI.redefinirSenha(token, senha);

                setMensagem('Senha redefinida com sucesso! Agora você já pode fazer login com sua nova senha.');
            } catch (err) {
                setMensagem('Erro ao redefinir senha. Por favor tente novamente.');
            }
        }
    };

    return (
        <Grid container justifyContent="center" style={{ marginTop: '50px' }}>
            <Grid item xs={12} md={6}>
                <Paper style={{ padding: '40px', textAlign: 'center' }}>
                    <Typography variant="h4" style={{ marginBottom: '20px' }}> Redefinição de Senha </Typography>

                    {mensagem && <Typography color={mensagem.startsWith('Erro') ? 'error' : 'primary'}>{mensagem}</Typography>}

                    <Typography variant="body1" style={{ marginBottom: '20px' }}> Insira sua nova senha abaixo. </Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Nova senha"
                        type="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Confirmar senha"
                        type="senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />

                    <Button variant="contained" color="primary" onClick={handleRedefinicaoSenha} style={{ marginTop: '20px' }}>
                        Redefinir Senha
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
}
