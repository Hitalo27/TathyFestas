import { useState, useEffect } from 'react';
import { Grid, Typography, Button, Card, CardMedia, CardContent, Box, TextField, Snackbar, IconButton } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from '@mui/material';
import ProdutoClass from '../../models/ProdutoClass';
import { Produto } from "@/types/Produto";
import ProdutoAPI from '../../API/ProdutoAPI';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { JWTPayload } from '../../types/JWTPayload';
import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import { PageContext } from '@/types/enums/PageContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Zoom from '@mui/material/Zoom';
import Breadcrumbs, { BreadcrumbLink } from '../components/visuals/Breadcrumbs';

const DynamicLayout = dynamic(() => import('@/app/layout'), { ssr: false });

export default function DetalhesProduto() {
  const router = useRouter();

  const { produtoId } = router.query;
  const [produto, setProduto] = useState<Produto>();

  const [quantidade, setQuantidade] = useState<number>(1);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [imagemAtual, setImagemAtual] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const breadcrumbLinks: BreadcrumbLink[] = [
    { text: 'Home', pageContext: PageContext.Home },
    { text: 'Listagem Produtos', pageContext: PageContext.ListagemProdutos },
    { text: 'Detalhes Produto', onClick: () => { } },
  ];

  useEffect(() => {
    const buscarProduto = async () => {
      if (!produtoId) return;

      try {
        const response = await ProdutoAPI.buscarProdutoPorId(Number(produtoId));
        
        setProduto(new ProdutoClass(response.data));
      } catch (error) {
        exibirSnackbar('Erro ao buscar detalhe do produto: ' + error);
      }
    };

    if (router.isReady) {
      buscarProduto();
    }
  }, [produtoId, router.isReady]);
  

  const handleAdicionarCarrinho = async () => {
    if (!produto) return;

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      exibirSnackbar('Usuário não autenticado. Por favor, faça o login.');
      return;
    }

    const decodedToken = jwtDecode<JWTPayload>(token);
    const idUsuario = decodedToken?.sub;

    // if (!idUsuario) {
    //   exibirSnackbar('Usuário não autenticado. Por favor, faça o login.');
    //   return;
    // }

    setLoading(true);

    try {
      const itemCarrinho = {
        id: 0,
        produto: produto,
        quantidade: quantidade
      };

      setMensagemSucesso('Produto adicionado ao carrinho!');
      setLoading(false);
      setDialogOpen(true);
    } catch (error: unknown) {
      let mensagemErro = "Um erro desconhecido ocorreu: " + error;

      if (error instanceof AxiosError)
        mensagemErro = 'Erro ao adicionar produto ao carrinho: ' + error.response?.data;

      setMensagemErro(mensagemErro);
      setLoading(false);
      setDialogOpen(true);
    }
  };

  const exibirSnackbar = (mensagem: string) => {
    setSnackbarMessage(mensagem);
    setSnackbarOpen(true);
  };

  const handleCloseDialog = () => {
    // Inicia animação de close do dialog
    setDialogOpen(false);

    // Aguarda a animação terminar para resetar o state
    setTimeout(() => {
      setMensagemSucesso('');
      setMensagemErro('');
    }, 300);
  };

  const renderDialog = () => {
    const ehSucesso = !mensagemErro;

    const dialogIcon = ehSucesso
      ? <CheckCircleOutlineIcon style={{ color: 'green', fontSize: 60 }} />
      : <ErrorOutlineIcon style={{ color: 'red', fontSize: 60 }} />;

    const dialogTitle = ehSucesso ? 'Sucesso!' : 'Erro';

    const dialogMessage = mensagemErro || mensagemSucesso;

    return (
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <Zoom in={dialogOpen}>
          <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {dialogIcon}
            {dialogTitle}
          </DialogTitle>
        </Zoom>
        <DialogContent>
          <DialogContentText>
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fechar
          </Button>
          {ehSucesso 
  }
        </DialogActions>
      </Dialog>
    );
  }

  if (!produto) return <Box mt={4}><Typography align="center">Carregando...</Typography></Box>;

  const imagemData = `data:image/jpeg;base64,${produto.imagens}`;

const proximaImagem = () => {
  setImagemAtual((prev) => (prev + 1) % produto.imagens.length);
};

// Função para voltar para a imagem anterior
const imagemAnterior = () => {
  setImagemAtual((prev) => (prev - 1 + produto.imagens.length) % produto.imagens.length);
};

  return (
    <DynamicLayout>
      <Box sx={{ marginTop: 4, flexGrow: 1 }}>

        <Box sx={{ marginBottom: 4, marginLeft: 2 }}>
          <Breadcrumbs links={breadcrumbLinks} />
        </Box>

        {/* <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={8} md={5} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                image={imagemData}
                alt={produto.nome}
                sx={{ objectFit: 'cover', maxHeight: '400px' }}
              />
            </Card>
          </Grid> */}

          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={8} md={5} lg={4}>
          <Card sx={{ position: 'relative', height: '100%' }}>
  <CardMedia
    component="img"
    image={`data:image/jpeg;base64,${produto.imagens[imagemAtual]}`}
    alt={produto.nome}
    sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
  />
  <IconButton
    onClick={imagemAnterior}
    disabled={imagemAtual === 0}
    sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
  >
    <ArrowBackIcon style={{ color: 'blue', fontSize: 30 }} />
    </IconButton>
    <IconButton
    onClick={proximaImagem}
    disabled={imagemAtual === produto.imagens.length - 1}
    sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
  >
    <ArrowForwardIcon style={{ color: 'blue', fontSize: 30 }} />
    </IconButton>
</Card>
          </Grid>


          <Grid item xs={12} sm={8} md={5} lg={4}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom component="div">
                  {produto.nome}
                </Typography>

                <Typography variant="h5" gutterBottom sx={{ color: 'green' }}>
                  R$ {produto.preco}
                </Typography>

                <Typography variant="body1" paragraph>
                  {produto.descricao}
                </Typography>

                <Typography variant="subtitle1" color="textSecondary">
                  Categoria: {produto.categoria}
                </Typography>

                <Box mt={2}>
                  <Button
  variant="contained"
  color="primary"
  onClick={() => window.open('https://wa.me/5531989725898')}
  sx={{ backgroundColor: '#1976d2 !important', width: '100%' }}
>
  Contratar festa
</Button>

                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        )}

        {renderDialog()}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Box>
    </DynamicLayout>
  );
}
