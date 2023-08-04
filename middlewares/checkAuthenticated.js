module.exports = (req, res, next) => {
    const token = req.cookies.token;
   
    if (token) {
      // Se um token estiver presente, redirecione para /dashboard
      return res.redirect('/dashboard');
    }
  
    // Se não houver token, continue para a próxima rota ou middleware
    next();
  };
  