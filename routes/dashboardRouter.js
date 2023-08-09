const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const checkAuthenticated = require('../middlewares/checkAuthenticated');

// Rota protegida que requer um cookie de token
router.get('/', checkAuthenticated, dashboardController.showDashboard);

module.exports = router; 
