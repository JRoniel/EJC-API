const userModel = require('../models/userModel');
const tokenController = require('../controllers/tokenController');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await userModel.getUserByUsernameAndPassword(username, password);
      
      if (user === null) {
        console.log('[LOG-EVENT] Credenciais informadas inválidas  ou incorretas');
        return; // Encerra a função caso as credenciais sejam inválidas
      } 

      // Autenticação bem-sucedido
      const userData = { userId: user.id }; 
      const token = tokenController.createToken(userData);
      if (token) {
        tokenController.addCookie(res, 'token', token, { httpOnly: true, maxAge: 3600000 });
      }

      res.redirect('/dashboard'); // Renderiza a página "dashboard.ejs" após o login bem-sucedido
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).send('Erro no servidor.');
    }
  }
}