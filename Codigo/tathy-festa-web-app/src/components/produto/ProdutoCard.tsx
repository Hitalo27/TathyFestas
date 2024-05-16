import React from 'react';
import { Box, Card, Link, Typography, Stack, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProdutoClass from '../../models/ProdutoClass';

interface ProdutoCardProps {
  produto: ProdutoClass;
}

const ImgProdutoStyled = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
  const { id, nome, imagens, descricao, preco} = produto;

  const imagemData = `data:image/jpeg;base64,${imagens[0]}`;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ImgProdutoStyled alt={nome} src={imagemData} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Link color="inherit" underline="hover">
              <Typography variant="subtitle1" noWrap>
                {nome}
              </Typography>
            </Link>
          </Grid>

          <Grid item>
            <Typography variant="subtitle2">
              R$ {preco}
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="subtitle2">
              {descricao}
            </Typography>
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" href={`/produto/${id}`}>
          Ver decoração
        </Button>
      </Stack>
    </Card>
  );
}

// export default ProdutoCard;


// import React from 'react';
// import { Box, Card, Link, Typography, Stack, Button, Grid } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import ProdutoClass from '../../../models/ProdutoClass';

// interface ProdutoCardProps {
//   produto: ProdutoClass;
// }

// const ImgProdutoStyled = styled('img')({
//   top: 0,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   position: 'absolute',
// });

// const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
//   const { id, nome, imagens, descricao, preco } = produto;
//   console.log(produto.nome);

//   const imagemUrl = imagens.length > 0 ? imagens[0] : ''; 

//   return (
//     <Card>
//       <Box sx={{ pt: '100%', position: 'relative' }}>
//         <ImgProdutoStyled alt={nome} src={imagemUrl} />
//       </Box>

//       <Stack spacing={2} sx={{ p: 3 }}>
//         <Grid container justifyContent="space-between" alignItems="center">
//           <Grid item>
//             <Link color="inherit" underline="hover">
//               <Typography variant="subtitle1" noWrap>
//                 {nome}
//               </Typography>
//             </Link>
//           </Grid>

//           <Grid item>
//             <Typography variant="subtitle2">
//               R$ {preco}
//             </Typography>
//           </Grid>
//         </Grid>

//         <Grid container justifyContent="space-between" alignItems="center">
//           <Grid item>
//             <Typography variant="subtitle2">
//               {descricao}
//             </Typography>
//           </Grid>
//         </Grid>

//         <Button variant="contained" color="primary" href={`/produto/${id}`}>
//           Ver produto
//         </Button>
//       </Stack>
//     </Card>
//   );
// }

 export default ProdutoCard;
