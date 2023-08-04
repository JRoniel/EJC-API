const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const checkAuthenticated = require('../middlewares/checkAuthenticated'); 
const tokenController = require('../controllers/tokenController');

// Use o middleware para verificar se o usuário já está autenticado antes de acessar /auth
router.get('/', checkAuthenticated, (req, res) => {
    res.render('login'); // Ou redirecione para a página de login
  });

// Rota de login 
router.get('/', (req, res) => {
    res.render('login');
});

// Rota de logout
router.get('/logout', (req, res) => {
  // Aqui você remove o cookie de token e redireciona para a página de login
  tokenController.removeCookie(res, 'token');
  res.redirect('/auth');
});

// Rota para a validação das credenciais de login
router.post('/validation', authController.login);

module.exports = router;
