const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const checkAuthenticated = require('../middlewares/checkAuthenticated'); 
 
// Use o middleware para verificar se o usuário já está autenticado antes de acessar /auth
router.get('/', checkAuthenticated, (req, res) => {
  res.render('login'); // Ou redirecione para a página de login
});

// Rota de login 
router.get('/', (req, res) => {
  res.render('login');
});


// Rota de logout GET (auth/logout)
router.get('/logout', (req, res) => {
  res.render('logout'); 
});

// Rota de logout POST (auth/logout)
router.post('/logout', authController.logout);

// Rota para a validação das credenciais de login (auth/validation)
router.post('/validation', authController.login);

module.exports = router;