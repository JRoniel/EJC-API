const tokenController = require('../controllers/tokenController');

module.exports = (req, res, next) => {
  try {
    const tokenData = tokenController.getTokenData();

    if (tokenData) {
      return true; // Autenticação correta
    } else {
      return false; // Autenticação incorreta
    }

  } catch (err) {
    console.log('[LOG-EVENT] CheckAuthenticated error: ', err);
    return false; // Autenticação incorreta em caso de erro
  }
};
