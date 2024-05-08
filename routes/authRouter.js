const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')

// models
const User = require("../models/User");
const AuthController = require("../controllers/AuthController");

module.exports = (app) => {

    // Open Route
    app.get("/", (req, res) => {
        res.status(200).json({ msg: "Bem vindo a EJC-WEB-APP!" });
    });

    // Private Route
    app.get("/user/:id", AuthController.checkToken, async (req, res) => {
        const id = req.params.id;

        const user = await User.findById(id, "-password");

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        res.status(200).json({ user });
    });

    // Register
    app.post("/auth/register", async (req, res) => {
        const { name, email, password, confirmPassword, level} = req.body;

        // Validations
        if (!name) {
            return res.status(422).json({ msg: "O nome é obrigatório!" });
        }

        if (!level) {
            return res.status(422).json({ msg: "O nivel de segurança é obrigatório!" });
        }

        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório!" });
        }

        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatória!" });
        }

        if (password !== confirmPassword) {
            return res.status(422).json({
                msg: "A senha e a confirmação precisam ser iguais!"
            });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(422).json({ msg: "Por favor, utilize outro email!" });
        }

        // Create password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        
        // Create user
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            level,
            name,
            email,
            password: passwordHash
        });

        try {
            await user.save();

            res.status(201).json({ msg: "Usuário criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: error });
        }
    });

    // Login
    app.post("/auth/login", async (req, res) => {
        const { email, password } = req.body;

        // Validations
        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório!" });
        }

        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatória!" });
        }

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        // Check if password match
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).json({ msg: "Senha inválida" });
        }

        try {
            const secret = process.env.SECRET;

            const expirationTime = new Date(Date.now() + process.env.EXPIRATION_TIME); 

            const token = jwt.sign(
                {
                    id: user._id,
                    level: user.level
                },
                secret,
                { expiresIn: expirationTime.getTime() / 1000 }
            );

            res.status(200).json({
                msg: "Autenticação realizada com sucesso!",
                token
            });
        } catch (error) {
            res.status(500).json({ msg: error });
        }
    });
};
