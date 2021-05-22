const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/rest/user/",
        [authJwt.verifyToken],
        controller.getUserObject
    );
};
