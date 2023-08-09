/** 
 * CODIGO OBSOLETO
const tokenController = require('../controllers/tokenController');

module.exports = (req, res, next) => {
  const token = tokenController.getTokenData();

  if (token) {
    return;
  }

  next();
};
*/