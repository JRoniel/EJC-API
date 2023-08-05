const jwt = require('jsonwebtoken');

function verifyTokenCookie(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.error('[LOG-EVENT] Token não encontrado, redirecionando para página de autenticação');
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
