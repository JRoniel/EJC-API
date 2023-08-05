const express = require('express');
const authRoutes = require('./authRouter');
const dashboardRoutes = require('./dashboardRouter');

const router = express.Router();

// Todas as rotas de autenticação terão /auth como prefixo na URL
router.use('/auth', authRoutes);

// Todas as rotas do painel de controle terão /dashboard como prefixo na URL
router.use('/dashboard', dashboardRoutes);

// Rota inicial que redireciona para /auth
router.get('/', (req, res) => {
  res.redirect('/auth');
});

module.exports = router;
