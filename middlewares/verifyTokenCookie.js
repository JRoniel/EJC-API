const jwt = require('jsonwebtoken');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

function verifyTokenCookie(req, res, next) {
  const token = req.cookies.token;

  if (!token || !token.username) {
    console.error('[LOG-EVENT] Token não encontrado ou nome de usuário ausente, redirecionando para página de autenticação');
    return res.redirect('/auth'); // Redireciona para a página de autenticação
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded; // Adiciona os dados do usuário decodificados ao objeto de solicitação
    next(); // Continue para a próxima rota ou middleware
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.redirect('/auth'); // Redireciona para a página de autenticação
  }
}

module.exports = verifyTokenCookie;
