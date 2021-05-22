const db = require("../models")
const config = require("../config/auth.config")
const User = db.user
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.signIn = (req, res) => {
    const {username = "", password = ""} = req.body
    if (!username || username.trim() === "") {
        res.status(500).json({
            status: "error",
            message: {
                username: "Поле является обязательным для заполнения"
            }
        })
    } else {
        User.findOne({
            where: {
                username: username
            }
        })
            .then(user => {
                if (!user) {
                    res.status(500).json({
                        status: "error",
                        message: {
                            message: "Неверный логин или пароль"
                        }
                    })
                } else {
                    if (!password){
                        res.status(500).json({
                            status: "error",
                            message: {
                                message: "Неверный логин или пароль"
                            }
                        })
                    }
                    const passwordIsValid = bcrypt.compareSync(
                        password,
                        user.password
                    );

                    if (!passwordIsValid) {
                        res.status(500).json({
                            status: "error",
                            message: {
                                message: "Неверный логин или пароль"
                            }
                        })
                    } else {
                        const token = jwt.sign({id: user.id}, config.secret, {
                            expiresIn: 86400
                        });
                        res.status(200).json({
                            status: "ok",
                            message: {
                                token
                            }
                        })
                    }
                }
            })
            .catch(() => {
                res.status(500).json({
                    status: "error",
                    message: {
                        message: "Ошибка сервера"
                    }
                })
            })
    }
}
