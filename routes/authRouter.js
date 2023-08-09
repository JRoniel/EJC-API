const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const checkAuthenticated = require('../middlewares/checkAuthenticated'); 
 
// Rota para a página de login (auth/login)
router.get('/', (req, res) => {
  res.render('login'); 
});

// Rota de logout GET (auth/logout)
router.get('/logout', authController.logout);

// Rota para a validação das credenciais de login (auth/validation)
router.post('/validation', authController.login);

module.exports = router;
