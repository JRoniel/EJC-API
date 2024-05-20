
const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.get("/user/:id", AuthController.checkToken, async (req, res) => {
    try {
        const user = await AuthController.getUser(req);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

router.put("/user/:id", AuthController.checkToken, async (req, res) => {
    try {
        const user = await AuthController.updateUser(req);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

router.post("/auth/register", async (req, res) => {
    try {
        const user = await AuthController.registerUser(req);
        res.status(201).json(user);
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
});

router.post("/auth/login", async (req, res) => {
    try {
        const user = await AuthController.loginUser(req);
        res.status(200).json(user);
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
});

router.get("/auth/logout", AuthController.checkToken, async (req, res) => {
    try {
        await AuthController.logoutUser(req);
        res.status(200).json({ msg: "Logout realizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = router;

