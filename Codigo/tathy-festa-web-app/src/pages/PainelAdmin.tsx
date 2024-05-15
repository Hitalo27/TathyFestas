import { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Tabs, Tab } from '@mui/material';
import CadastroCliente from '../pages/components/cliente/CadastroCliente';
import ListagemCliente from '../pages/components/cliente/ListagemCliente';
import CadastroProduto from '../pages/produto/CadastroProduto';
import RelatorioEstoque from './relatorios/RelatorioEstoque';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const DynamicLayout = dynamic(() => import('@/app/layout'), { ssr: false });

export default function PainelAdmin() {
    const router = useRouter();
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
    const [tabAtiva, setTabAtiva] = useState(0);

    useEffect(() => {
        // Lógica para verificar se o usuário está autenticado
        const usuarioAutenticado = verificarAutenticacao(); // Implemente essa função
        setUsuarioAutenticado(usuarioAutenticado);
        if (!usuarioAutenticado) {
            router.push('/'); // Redireciona para a página de login se não estiver autenticado
        }
    }, []);

    const verificarAutenticacao = () => {
        const token = localStorage.getItem('jwtToken');
        if (token && token !== "undefined") {
            return true;
        }
        return false; // Altere para true se o usuário estiver autenticado
    };

    const handleTrocaTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabAtiva(newValue);
    };

    if (!usuarioAutenticado) {
        return <div>Verificando autenticação...</div>; // Exibir algo enquanto verifica a autenticação
    }

    return (
        <DynamicLayout>
            <Grid container justifyContent="center" spacing={3} marginTop={1}>
                <Grid item xs={12} md={11}>
                    <Paper sx={{ padding: 4 }}>
                        <Typography variant="h6" mb={1}> Painel Administrador </Typography>

                        <Tabs value={tabAtiva} onChange={handleTrocaTab} aria-label="painel-admin-tabs">
                            <Tab label="Cadastrar Decoração" />
                            <Tab label="Cadastrar Cliente" />
                            <Tab label="Listagem Clientes" />
                            <Tab label="Relatório de Estoque" />
                        </Tabs>

                        {tabAtiva === 0 && <CadastroProduto componentRender={true} />}
                        {tabAtiva === 1 && <CadastroCliente/>}
                        {tabAtiva === 2 && <ListagemCliente/>}
                        {tabAtiva === 3 && <RelatorioEstoque />}
                    </Paper>
                </Grid>
            </Grid>
        </DynamicLayout>
    );
}
