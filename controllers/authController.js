
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/User");
const Validator = require("../middlewares/Validator");
const Language = require("../middlewares/Language");

async function loginUser(req, res) {
    const { email, password } = req.body; 
    // Validations
    if (!Validator.isValidator('email', email)) {
        return res.status(422).json(Langague.getMessage('INVALID_EMAIL'));
    }

    if (!Validator.isValidator('password', password)) {
        return res.status(422).json(Langague.getMessage('INVALID_PASSWORD'));
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json(Langague.getMessage('USER_NOT_FOUND'));
    }

    try {
        // Check if password matches
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).json(Language.getMessage('INVALID_PASSWORD'));
        }

        return user;

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function registerUser(req, res, returnNew = false) {
    const { name, email, password, level } = req.body;

    // Validations
    if (!Validator.isValidator('email', email)) {
        return res.status(422).json(Langague.getMessage('INVALID_EMAIL'));
    }

    if (!Validator.isValidator('password', password)) {
        return res.status(422).json(Langague.getMessage('INVALID_PASSWORD'));
    }
    // Validations
    if (!Validator.isValidator('level', level)) {
        return res.status(422).json(Langague.getMessage('INVALID_LEVEL'));
    }

    if (!Validator.isValidator('name', name)) {
        return res.status(422).json(Langague.getMessage('INVALID_NAME'));
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists || Validator.isValidator('email', email) === false) {
        return res.status(422).json(Langague.getMessage('INVALID_EMAIL_REGISTER'));
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

        return user;

    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    loginUser,
    registerUser
}

