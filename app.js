const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const consign = require("consign");

dotenv.config();
const Language = require('./middlewares/Language');

const app = express();

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
  try {
    const message = Language.getMessage('NO_ROUTE_ESTABELECED');
    res.status(200).json(message);
  } catch (error) {
    res.status(500).send('Something broke!');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Inicializa a aplicacao
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

module.exports = { app };

