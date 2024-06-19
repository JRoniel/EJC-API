const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const consign = require("consign");
const bodyParser = require('body-parser');

dotenv.config();
const Language = require('./middlewares/Language');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

// Configura o CORS para permitir acesso de qualquer origem
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Config JSON response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conecta ao banco de dados
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("[SUCESS] Conectado ao MongoDB"))
    .catch(err => console.error(`[ERRO] ${err.message}`));

// Carrega as rotas e controllers
consign()
  .include('routes')
  .then('controllers')
  .into(app);

app.get("/", async (req, res) => {
  res.status(200).render('indexRender');
});

// Capturando rotas não estabelecidas (404)
app.use((req, res, next) => {
  const message = Language.getMessage('ERROR_404');
  res.status(404).json(message);
});

// Tratamento de erros gerais
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(Language.getMessage('INTERNAL_ERROR') + err.message);
});

// Inicializa a aplicacao
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

module.exports = { app };

