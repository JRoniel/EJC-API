const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const consign = require("consign");

dotenv.config();

const app = express();

// Config JSON response
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Conecta ao banco de dados
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("[SUCESS] Conectado ao MongoDB"))
    .catch(err => console.log(err));
 
// Carrega as rotas e controllers
consign({
    cwd: __dirname,
})
    .include("./routes")
    .then("./controllers")
    .into(app);

// Inicializa a aplicacao
const porta = process.env.PORTA || 3000;
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));

module.exports = { app };