import { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Box, Snackbar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ProdutoClass from '../../models/ProdutoClass';
import ProdutoAPI from '../../API/ProdutoAPI';
import { Categoria } from '@/types/enums/Categoria';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicLayout = dynamic(() => import('@/app/layout'), { ssr: false });

export default function CadastroProduto({ componentRender = false }) {
  const [nomeProduto, setNomeProduto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState<number | string>('');
  const [imagens, setImagens] = useState<File[]>([]);
  const [categoria, setCategoria] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState<number>(1);
  const [quantidadeBaixa, setQuantidadeBaixa] = useState<number>(0);
  const router = useRouter();
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  const [produto, setProduto] = useState<ProdutoClass | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const exibirSnackbar = (mensagem: string) => {
    setSnackbarMessage(mensagem);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    const usuarioAutenticado = verificarAutenticacao();
    setUsuarioAutenticado(usuarioAutenticado);
    if (!usuarioAutenticado) {
        router.push('/');
    }
}, []);

const verificarAutenticacao = () => {
    const token = localStorage.getItem('jwtToken');
    if (token && token !== "undefined") {
        return true;
    }
    return false;
};

  const atualizarStateProduto = (novasImagens?: string[]) => {
    const novoProduto = ({
      nome: nomeProduto,
      descricao: descricao,
      preco: parseFloat(preco.toString()),
      imagens: novasImagens || [],
      categoria: categoria,
      quantidadeEstoque: quantidadeEstoque,
      quantidadeBaixa: quantidadeBaixa,
    });

    const produtoCadastrado = ProdutoClass.criarNovoProduto(novoProduto);
    console.log(preco);
    setProduto(produtoCadastrado);
  };


  const onChangeImagemURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const novasImagens = Array.from(e.target.files);
      setImagens([...imagens, ...novasImagens]);

      novasImagens.forEach(imagem => {
        const novaImagemURL = URL.createObjectURL(imagem);
      });
    }
  };

  const onClickCadastrarProduto = async () => {
    if (!produto) return;

    if (!validarCamposProduto()) return;

    try {

      const imagensURLs: string[] = [];
      for (const imagem of imagens) {
        const url = URL.createObjectURL(imagem);
        imagensURLs.push(url);
      }

      const imagensBase64: string[] = [];
      for (const imagemURL of imagensURLs) {
          const img = new Image();
          img.crossOrigin = "Anonymous";
      
          const promessaCarregarImagem = new Promise<string>((resolve, reject) => {
              img.onload = function () {
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  if (ctx) { // Verifica se ctx não é null
                      canvas.width = img.width;
                      canvas.height = img.height;
                      ctx.drawImage(img, 0, 0);
                      const dataURL = canvas.toDataURL('image/png');
                      resolve(dataURL);
                  } else {
                      reject(new Error('Não foi possível obter o contexto 2D do canvas.'));
                  }
              };
              img.onerror = function () {
                  reject(new Error('Erro ao carregar a imagem'));
              };
          });
      
          img.src = imagemURL;
      
          try {
              const base64Imagem = await promessaCarregarImagem;
              if (typeof base64Imagem === 'string') {
                  imagensBase64.push(base64Imagem);
              } else {
                  console.error('A imagem convertida não é uma string.');
                  // Trate o erro, se necessário
              }
          } catch (error) {
              console.error(error);
              // Trate o erro, se necessário
          }
      }
      
      

      const response = await ProdutoAPI.criarProduto({
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        preco: parseFloat(preco.toString()),
        imagens: imagensBase64,
        categoria: produto.categoria,
        quantidadeEstoque: produto.quantidadeEstoque,
        quantidadeBaixa: quantidadeBaixa,
      });
      

      if (response.status >= 200 && response.status < 300) {
        exibirSnackbar('Decoração cadastrado com sucesso!');
        

        setNomeProduto('');
        setDescricao('');
        setPreco('');
        setImagens([]);
        setCategoria('');
        setQuantidadeEstoque(1);
        setQuantidadeBaixa(0);

        setProduto(null);
      } else {
        exibirSnackbar('Erro ao cadastrar decoração.');
      }
    } catch (error) {
      exibirSnackbar('Erro ao cadastrar decoração: ' + error);
    }
  };

  const validarCamposProduto = () => {
    if (!nomeProduto.trim()) {
      exibirSnackbar('O nome da decoração não pode estar vazio.');
      return false;
    }

    if (!descricao.trim()) {
      exibirSnackbar('A descrição não pode estar vazia.');
      return false;
    }

    if (!preco || parseFloat(preco.toString().replace(',', '.')) <= 0) {
      exibirSnackbar('O preço deve ser maior que zero.');
      return false;
    }

    if (!imagens) {
      exibirSnackbar('Você deve selecionar uma imagem para o produto.');
      return false;
    }

    if (!categoria) {
      exibirSnackbar('Selecione uma categoria.');
      return false;
    }

    return true;
  };

  function uint8ArrayParaBase64(buffer: Uint8Array): string {
    let binary = '';

    for (let i = 0; i < buffer.byteLength; i++) {
      binary += String.fromCharCode(buffer[i]);
    }

    return btoa(binary);
  }

  function arrayBufferParaBlobUrl(buffer: Uint8Array): string {
    const blob = new Blob([buffer]);

    return URL.createObjectURL(blob);
  }

  const formataPreco = (valor: string) => {
    // Apenas dígitos
    const digitos = valor.replace(/\D/g, '');

    // Preenche com zeros para garantir pelo menos dois dígitos decimais
    const preenchido = digitos.padStart(3, '0');

    // Insere vírgula para representar os decimais
    let comVirgula = preenchido.slice(0, -2) + ',' + preenchido.slice(-2);

    // Adiciona ponto como separador de milhares
    let partes = comVirgula.split(',');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Remove zeros à esquerda após a formatação (garante pelo menos um zero à esquerda para o valor inicial)
    partes[0] = partes[0].replace(/^0+(\d)/, '$1');

    return partes.join(',');
  };

  const handleQuantidadeEstoqueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantidadeEstoque(value === '' ? 0 : Number(value));
  };

  const handleCategoriaChange = (categoria: Categoria) => {
    setCategoria(categoria);

    setProduto((produtoPrev) => {
      if (!produtoPrev) return null;
      return new ProdutoClass({
        ...produtoPrev,
        categoria: categoria,
      });
    });
  }

  const content = (
    <Grid container justifyContent="center" spacing={3} marginTop={1}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h5" mb={3} textAlign="center">Cadastro de Decoração</Typography>

          <TextField
            fullWidth
            label="Nome da Decoração"
            value={nomeProduto}
            sx={{ mb: 2 }}
            onChange={(e) => { setNomeProduto(e.target.value); atualizarStateProduto(); }}
          />

          <TextField
            fullWidth
            label="Descrição"
            value={descricao}
            sx={{ mb: 2 }}
            onChange={(e) => { setDescricao(e.target.value); atualizarStateProduto(); }}
          />

<Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Preço"
                value={preco}
                onChange={(e) => {
                   setPreco(formataPreco(e.target.value));
                  atualizarStateProduto();
                  // const valor = e.target.value;
                  // console.log("Valor do campo de preço:", valor);
                  // const precoNumerico = parseFloat(valor.replace(',', '.'));
                  // console.log("Preço convertido para número:", precoNumerico);
                  // if (!isNaN(precoNumerico)) {
                  //   setPreco(precoNumerico);
                  //   atualizarStateProduto(); 
                  // } else {
                  //   console.log("Erro ao converter preço para número.");
                  // }
                }}
                inputMode="numeric"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="categoria-label">Categoria</InputLabel>
                <Select
                  labelId="categoria-label"
                  id="categoria-select"
                  value={categoria}
                  onChange={(e) => handleCategoriaChange(e.target.value as Categoria)}
                  label="Categoria"
                >
                  {Object.values(Categoria).map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quantidade Estoque"
                value={quantidadeEstoque}
                onChange={handleQuantidadeEstoqueChange}
                type="number"
              />

            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quantidade Baixa"
                value={quantidadeBaixa}
                onChange={(e) => setQuantidadeBaixa(Number(e.target.value))}
                type="number"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="btn-img-upload"
              type="file"
              multiple  // Adicionando o atributo 'multiple' para permitir múltiplas seleções
              onChange={onChangeImagemURL}
            />
            <label htmlFor="btn-img-upload">
              <Button variant="contained" component="span" color="primary">
                Adicionar Imagens da Decoração
              </Button>
            </label>
            {imagens.map((url, index) => (
              <Box
                key={index}
                sx={{
                  width: '100%',
                  maxWidth: '400px',
                  maxHeight: '300px',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                  border: '1px solid #ddd',
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <img
                  src={typeof url === 'string' ? url : URL.createObjectURL(url)}
                  alt={`Preview Produto ${index + 1}`}
                  style={{
                    height: 'auto',
                    maxWidth: '100%',
                  }}
                />
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#1976d2 !important', ":hover": { backgroundColor: '#005cb2 !important' }  }}
            onClick={onClickCadastrarProduto}
          >Cadastrar Decoração</Button>

        </Paper>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Grid>
  );

  return componentRender ? content : <DynamicLayout>{content}</DynamicLayout>;
}
