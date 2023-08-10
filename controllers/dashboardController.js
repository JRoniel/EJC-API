const tokenController = require('../controllers/tokenController');

module.exports = {
  showDashboard: (req, res) => {
    try {
      const tokenData = tokenController.getTokenData(); 

      if (tokenData != undefined) {
        const username = tokenData.username;
        res.render('dashboard', { LoggedUser: username });
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
