const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const cookieController = require('../controllers/cookieController');

module.exports = {
  showDashboard: (req, res) => {
    try {
      console.log('SHOWDASHBOAR>> req.cookies.token:', req.cookies.token);
      const decodedToken = cookieController.decodeCookie(req.cookies.token);

      if (decodedToken) {
        const username = decodedToken.username;
        // Faça o que for necessário para mostrar o painel de controle
        res.render('dashboard', { username });
      } else {
        console.error('[LOG-ERROR] Não foi possível obter o username do token.');
        // Trate o erro de acordo com o seu fluxo
      }
    } catch (error) {
      console.error('[LOG-ERROR] Erro ao renderizar o painel de controle:', error);
      // Trate o erro de acordo com o seu fluxo
    }
  }
};
