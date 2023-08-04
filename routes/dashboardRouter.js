const express = require('express');
const router = express.Router();
const verifyTokenCookie = require('../middlewares/verifyTokenCookie'); // Importa o middleware
const dashboardController = require('../controllers/dashboardController');

// Rota protegida que requer um cookie de token
router.get('/', verifyTokenCookie, dashboardController.showDashboard);

module.exports = router;
