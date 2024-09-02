const UserController = require('../controllers/userController');

module.exports = (app) => {

    /*
    * Busca um usuario por ID
    * @param {Object} req - Requisicao
    * @param {Object} res - Resposta
    * @returns {Promise<Object>} - Retorna o usuario caso o ID seja encontrado, caso contrario retorna um erro
    */
    app.post("/user/search", async (req, res) => {
        try {
            const userId = req.body['token'];
            const i = await UserController.getUser(userId);
            res.status(200).json(i);
        } catch (error) {
            res.status(500).json(error);
        }
    });

        
    /*
    * Cria um novo usuario 
    * @param {Object} req - Requisicao
    * @param {Object} res - Resposta
    * @returns {Promise<Object>} - Retorna o usuario caso o cadastro seja feito com sucesso, caso contrario retorna um erro
    */    
    app.post("/user/id", async (req, res) => {
        try {
            const userId = req.body.id;
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
    app.get("/user/email", async (req, res) => {
        try {
            const email = req.body.email;
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

}