const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const checkAuthenticated = require('../middlewares/checkAuthenticated');

// Rota protegida que requer um cookie de token
router.get('/', checkAuthenticated, dashboardController.showDashboard);

// Rota para a validação das credenciais de login (dashboard/validation)
router.get('/validation', authController.login);

module.exports = router; 
