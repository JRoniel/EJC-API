const AuthController = require("../controllers/authController");
const Language = require('../middlewares/Language');

module.exports = (app) => {

/*
* Cadastra um novo usuario
* @param {Object} req - Requisicao
* @param {Object} res - Resposta
* @returns {Promise<Object>} - Retorna o usuario caso o cadastro seja feito com sucesso, caso contrario retorna um erro
*/
app.post("/auth/register", async (req, res) => {
    try {
        const i = await AuthController.registerUser(req);
        res.status(201).json(i);
    } catch (error) {
        res.status(422).json(Language.getMessage('INTERNAL_ERROR') + error);
    }
});

/*
* Faz login do usuario
* @param {Object} req - Requisicao
* @param {Object} res - Resposta
* @returns {Promise<Object>} - Retorna o usuario caso o login seja feito com sucesso, caso contrario retorna um erro
*/
app.post("/auth/login", async (req, res) => {
    try {
        const i = await AuthController.loginUser(req);
        res.status(200).json(i);
    } catch (error) {
        res.status(422).json(Language.getMessage('INTERNAL_ERROR') + error);
    }
});

}

