const AuthController = require("../controllers/authController");
const UserController = require('../controllers/userController');
const Language = require('../middlewares/Language');

module.exports = (app) => {

/*
* Cria um novo usuario 
* @param {Object} req - Requisicao
* @param {Object} res - Resposta
* @returns {Promise<Object>} - Retorna o usuario caso o cadastro seja feito com sucesso, caso contrario retorna um erro
*/    
app.get("/user/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const i = await UserController.getUser(userId);
        res.status(200).json(i);
    } catch (error) {
        res.status(500).json(Language.getMessage('INTERNAL_ERROR') + error);
    }
});

/*
* Busca um usuario por email
* @param {Object} req - Requisicao
* @param {Object} res - Resposta
* @returns {Promise<Object>} - Retorna o usuario caso o email seja encontrado, caso contrario retorna um erro
*/
app.get("/user/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const i = await UserController.getUserFromEmail(email);
        res.status(200).json(i);
    } catch (error) {
        res.status(500).json(Language.getMessage('INTERNAL_ERROR') + error);
    }
});

/*
* Atualiza os dados do usuario
* @param {Object} req - Requisicao
* @param {Object} res - Resposta
* @returns {Promise<Object>} - Retorna o usuario caso o cadastro seja feito com sucesso, caso contrario retorna um erro
*/
app.put("/user/:id", async (req, res) => {
    try {
        const i = await UserController.updateUser(req);
        res.status(200).json(i);
    } catch (error) {
        res.status(500).json(Language.getMessage('INTERNAL_ERROR') + error);
    }
});

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

