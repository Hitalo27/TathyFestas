const express = require('express');
const path = require('path');
const tsnode = require('ts-node');

// Configure o compilador ts-node
tsnode.register({
  project: path.join(__dirname, 'tsconfig.json') // Caminho para o seu tsconfig.json
});

const app = express();
const PORT = process.env.PORT || 3000; // Porta do seu servidor Node.js

// Rota para servir o componente ListagemProduto.tsx
app.get('/', (req, res) => {
  // Importe o componente ListagemProduto.tsx
  const ListagemProduto = require('tathy-festa-web-app/src/pages/index.tsx');

  // Renderize o componente como uma resposta HTTP
  res.send(ReactDOMServer.renderToString(ListagemProduto()));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
