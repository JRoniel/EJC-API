const authController = require('../controllers/authController');
const checkAuthenticated = require('../middlewares/checkAuthenticated'); 

module.exports = (app) => {

  app.get('/auth', (req, res, next) => {
    if (checkAuthenticated(req, res, next)) {
      res.redirect('/dashboard');
    } else {
      res.render('login'); 
    }
  });
  
  app.post('/auth/validation', authController.login);

  app.get('/auth/logout', authController.logout);

}