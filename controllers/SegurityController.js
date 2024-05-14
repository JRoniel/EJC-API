const AuthController = require("../controllers/AuthController");

function checkLevel(req, res, next) {
    const levelUser = req.body.level;
    const requireLevel = req.body.requireLevel;
    if (!levelUser || !requireLevel) {
        return res.status(400).json({ msg: "Parâmetros inválidos!" });
    }

    if (levelUser < requireLevel) {
        return res.status(401).json({ msg: "Acesso negado!" });
    } else {
        try {
            next();
        } catch (error) {
            console.error(error.stack);
            return res.status(500).json({ msg: "Erro interno do servidor!" });
        }
    }
}

function getLevelUser(req, res,levelClient) {
    AuthController.getUserFromToken(req).then((user) => {
        return user.level;
    })
}