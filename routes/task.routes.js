const { authJwt } = require("../middleware");
const controller = require("../controllers/task.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/rest/task/",
        controller.getTaskList
    );
    app.get("/api/rest/task/status/",
        controller.getStatusTaskList
    );
    app.post("/api/rest/task/crate",
        controller.createTask
    );
    app.post("/api/rest/task/edit/:id",
        [authJwt.verifyToken],
        controller.editTask
    );
};
