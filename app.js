const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const hashPassword = require('../middlewares/hashPassword');

const app = express();
const port = 3000;
require('dotenv').config();

app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_TOKEN,
    resave: false,
    saveUninitialized: true
}));

console.log('senha hash: ',hashPassword.hashPassword('123456'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const render = require('./routes/render');
app.use('/', render);

app.listen(port, (req, res) => {
    console.log(`[LOG-START] servidor rodando em http://localhost:${port}`);
});
