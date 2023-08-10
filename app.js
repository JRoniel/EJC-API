const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const consign = require('consign');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_TOKEN,
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

consign().include('routes').into(app);

app.listen(port, () => {
  console.log(`[LOG-START] servidor rodando em http://localhost:${port}`);
});
