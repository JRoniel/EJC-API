const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Importe o módulo cookie-parser

const app = express();
const port = 3000;
require('dotenv').config();
app.use(cookieParser()); // Use o middleware cookie-parser

app.use('/public', express.static(path.join(__dirname, '/public')));  //Configurando diretorio de arquivos estáticos (Css, Javascript)

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_TOKEN, // Defina o segredo da sessão no seu arquivo .env
    resave: false,
    saveUninitialized: true
  })); 

// Configurar o mecanismo de visualização
app.set('view engine', 'ejs'); // Use o mecanismo EJS para renderizar as visualizações
app.set('views', __dirname + '/views'); // Defina a pasta de visualizações como "views"

const render = require('./routes/render');
app.use('/', render); 

//Iniciando servidor na porta indicada
app.listen(port, (req, res) => {
    console.log(`[LOG-START] servidor rodando em http://localhost:${port}`);
});