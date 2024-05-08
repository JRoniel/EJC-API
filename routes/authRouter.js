
const AuthController = require("../controllers/AuthController");

module.exports = (app) => {

    // Rotas privadas
    // Get User
    app.get("/user/:id", AuthController.checkToken, async (req, res) => {
        AuthController.getUser(req, res);
    });

    // Update User
    app.put("/user/:id", AuthController.checkToken, async (req, res) => {
        AuthController.updateUser(req, res);
    });

    // Rotas publicas
    // Register
    app.post("/auth/register", async (req, res) => {
        AuthController.registerUser(req, res);
    });

    // Login
    app.post("/auth/login", async (req, res) => {
        AuthController.loginUser(req, res);
    });

};
