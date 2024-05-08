import React from 'react';
import { Grid } from '@mui/material';
import ProdutoCard from './ProdutoCard';
import ProdutoClass from '../../../models/ProdutoClass';

interface ProdutoCardGridProps {
  produtos: ProdutoClass[];
}

const ProdutoCardGrid: React.FC<ProdutoCardGridProps> = ({ produtos }) => {
  return (
    <Grid container spacing={3}>
      {produtos.map((produto) => (
        <Grid key={produto.id} item xs={12} sm={6} md={3}>
          <ProdutoCard produto={produto} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProdutoCardGrid;