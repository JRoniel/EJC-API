

const AuthController = require("../controllers/AuthController");
const UserController = require('../controllers/UserController');

module.exports = (app) => {

app.get("/user/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserController.getUser(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

app.get("/user/email/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const user = await UserController.getUserFromEmail(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

app.put("/user/:id", async (req, res) => {
    try {
        const user = await UserController.updateUser(req);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

app.post("/auth/register", async (req, res) => {
    try {
        const user = await AuthController.registerUser(req);
        res.status(201).json(user);
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
});

app.post("/auth/login", async (req, res) => {
    try {
        const user = await AuthController.loginUser(req);
        res.status(200).json(user);
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
});

}

