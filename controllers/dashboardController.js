const tokenController = require('../controllers/tokenController');

module.exports = {
  showDashboard: (req, res) => {
    try {
      const decodedToken = tokenController.decodeToken('token'); // Use o método decodeToken do tokenController

      if (decodedToken) {
        const username = decodedToken.username;
        console.log('decodToken: ', decodedToken);
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
