// pages/index.tsx

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para /produto/ListagemProdutos
    router.push('/produto/ListagemProdutos');
  }, []);

  // Renderização vazia, já que estamos fazendo um redirecionamento
  return null;
};

export default IndexPage;
