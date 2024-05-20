
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/User");

function updateUser(req, res, next) {
    const { item, value } = req.body;
    const userId = req.params.id;

    const user = User.findById(userId, {
        _id: true
    });

    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    const updatedUser = User.findByIdAndUpdate(userId, {
        [item]: value
    }, {
        new: true
    });

    res.status(200).json(updatedUser);
}

async function loginUser(req, res) {
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

    // Check if password matches

    const checkPassword = password && user ? bcrypt.compare(password, user.password) : null;

    if (checkPassword === false) {
        return res.status(422).json({ msg: "Senha inválida" });
    }

    try {
        const secret = process.env.SECRET;

        const token = jwt.sign( 
            {
                id: user._id.toHexString(),
                level: user.level
            },
            secret,
            { expiresIn: parseInt(process.env.EXPIRATION_TIME) / 1000 }
        );

        res.cookie('jwt', token, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV !== 'test' && true, maxAge: parseInt(process.env.EXPIRATION_TIME) * 1000 });
        res.redirect(`/dashboard`);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function registerUser(req, res) {
    const { name, email, password, level } = req.body;

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
}

module.exports = {
    loginUser,
    updateUser,
    registerUser
}

