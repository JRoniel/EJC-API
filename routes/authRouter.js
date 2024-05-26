const AuthController = require("../controllers/AuthController");
const UserController = require('../controllers/UserController');

module.exports = (app) => {

app.get("/user/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const i = await UserController.getUser(userId);
        res.status(200).json(i);
    } catch (error) {
        res.status(500).json(Language.getMessage('INTERNAL_ERROR' + error));
    }
});

app.get("/user/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const i = await UserController.getUserFromEmail(email);
        res.status(200).json(i);
    } catch (error) {
        res.status(500).json(Language.getMessage('INTERNAL_ERROR' + error));
    }
});

app.put("/user/:id", async (req, res) => {
    try {
        const i = await UserController.updateUser(req);
        res.status(200).json(i);
    } catch (error) {
        res.status(500).json(Language.getMessage('INTERNAL_ERROR' + error));
    }
});

app.post("/auth/register", async (req, res) => {
    try {
        const i = await AuthController.registerUser(req);
        res.status(201).json(i);
    } catch (error) {
        res.status(422).json(Language.getMessage('INTERNAL_ERROR' + error));
    }
});

app.post("/auth/login", async (req, res) => {
    try {
        const i = await AuthController.loginUser(req);
        res.status(200).json(i);
    } catch (error) {
        res.status(422).json(Language.getMessage('INTERNAL_ERROR' + error));
    }
});

}

