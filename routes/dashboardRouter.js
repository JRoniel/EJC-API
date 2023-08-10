const dashboardController = require('../controllers/dashboardController');
const checkAuthenticated = require('../middlewares/checkAuthenticated');

module.exports = (app) => {
  app.get('/dashboard', (req, res, next) => {
    if (checkAuthenticated(req, res, next)) {
      dashboardController.showDashboard(req, res);
    } else {
      res.redirect('/auth');
    }
  });
};
