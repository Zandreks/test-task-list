const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
verifyToken = (req, res, next) => {
    let token = req.headers["token"];

    if (!token) {
        res.status(500).json({
            status: "error",
            message: {
                message: "Токен истёк"
            }
        })
    } else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.status(500).json({
                    status: "error",
                    message: {
                        message: "Токен истёк"
                    }
                })

            } else {
                User.findOne({where: {id: decoded.id}, attributes: ["name", "surname"]})
                    .then(user => {
                        if (!!user) {
                            req.user = user;
                            next();
                        } else {
                            res.status(500).json({
                                status: "error",
                                message: {
                                    message: "Пользователь не найден"
                                }
                            })
                        }
                    }).catch(() => {
                    res.status(500).json({
                        status: "error",
                        message: {
                            message: "Ошибка сервера"
                        }
                    })
                })
            }
        })
    }


}


const authJwt = {
    verifyToken: verifyToken,
}
module.exports = authJwt
