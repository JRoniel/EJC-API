const jwt = require('jsonwebtoken');

module.exports = {
  createToken: (userData) => {
    try {
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });
      return token;
    } catch (error) {
      console.error('[JWT] Erro ao criar token:', error);
      return null;
    }
  },

  addCookie: (res, name, value, options = {}) => {
    res.cookie(name, value, options);
  },

  removeCookie: (res, name) => {
    res.clearCookie(name);
  }
};
