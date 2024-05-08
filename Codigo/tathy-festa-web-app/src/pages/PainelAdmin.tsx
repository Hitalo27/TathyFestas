import { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Tabs, Tab } from '@mui/material';
import ListagemUsuario from '../pages/components/usuario/ListagemUsuario';
import CadastroProduto from '../pages/produto/CadastroProduto';
import RelatorioEstoque from './relatorios/RelatorioEstoque';
import dynamic from 'next/dynamic';

const DynamicLayout = dynamic(() => import('@/app/layout'), { ssr: false });

export default function PainelAdmin() {
    useEffect(() => { }, []);

    const [tabAtiva, setTabAtiva] = useState(0);

    const handleTrocaTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabAtiva(newValue);
    };

    return (
        <DynamicLayout>
            <Grid container justifyContent="center" spacing={3} marginTop={1}>
                <Grid item xs={12} md={11}>
                    <Paper sx={{ padding: 4 }}>
                        <Typography variant="h6" mb={1}> Painel Administrador </Typography>

                        <Tabs value={tabAtiva} onChange={handleTrocaTab} aria-label="painel-admin-tabs">
                            <Tab label="Cadastrar Decoração" />
                            <Tab label="Usuários Cadastrados" />
                            <Tab label="Relatório de Estoque" />
                        </Tabs>

                        {tabAtiva === 0 && <CadastroProduto componentRender={true} />}
                        {tabAtiva === 1 && <ListagemUsuario />}
                        {tabAtiva === 2 && <RelatorioEstoque />}
                    </Paper>
                </Grid>
            </Grid>
        </DynamicLayout>
    );
}
