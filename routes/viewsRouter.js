
AuthController = require("../controllers/AuthController");

module.exports = (app) => {

    app.get('/', AuthController.checkToken, async (req, res) => {
        res.status(200).render("dashboard", { layout: "main" });
    });
    
    app.get("/login", async (req, res) => {
        res.status(200).render("login", { layout: "main" });
    });

    app.get("/dashboard", AuthController.checkToken, async (req, res) => {
        try {
            const user = await AuthController.getUserFromToken(req);
            res.status(200).render("dashboard", { layout: "main", user: user });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao obter o usuário do token");
        }
    });

}
