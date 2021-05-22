const db = require("../models")
const Task = db.task
const TaskStatus = db.statusTask

exports.getTaskList = (req, res) => {
    const {sort_field = "id", sort_direction = "asc", page = 1} = req.query;
    const limit = 3
    try {
        Task.findAndCountAll({
            attributes: ["id", "username", "email", "text", "status"],
            order: [
                [sort_field, sort_direction],
            ], offset: Number(page) * limit - limit, limit: limit
        })
            .then(tasks => {
                res.status(200).json({
                    status: "ok",
                    message: {
                        tasks: tasks.rows,
                        total_task_count: tasks.count
                    }
                })
            }).catch(() => {
            res.status(500).json({
                status: "error",
                message: {
                    message: "Ошибка сервера"
                }
            })
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: "error",
            message: {
                message: "Ошибка сервера"
            }
        })
    }


};
exports.createTask = (req, res) => {
    const {username = "", email = "", text = "", status = 0} = req.body
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (username.trim() === "") {
        res.status(500).json({
            status: "error",
            message: {
                username: "Поле является обязательным для заполнения"
            }
        })
    } else if (email.trim() === "" || re.test(String(email).toLowerCase()) === false) {
        res.status(500).json({
            status: "error",
            message: {
                email: "Неверный email"
            }
        })
    } else if (text.trim() === "") {
        res.status(500).json({
            status: "error",
            message: {
                text: "Поле является обязательным для заполнения"
            }
        })
    } else if (isNaN(status)) {
        res.status(500).json({
            status: "error",
            message: {
                status: "Неверный status"
            }
        })
    } else {
        const body = {
            username,
            email,
            text,
            status: Number(status)
        }
        Task.create(body)
            .then(task => {
                res.status(200).json({
                    status: "ok",
                    message: task
                })
            }).catch(() => {
            res.status(500).json({
                status: "error",
                message: {
                    message: "Ошибка сервера"
                }
            })
        })
    }

}
exports.editTask = (req, res) => {
    let {id} = req.params
    const {username = "", email = "", text = "", status = 1} = req.body

    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (username.trim() === "") {
        res.status(500).json({
            status: "error",
            message: {
                username: "Поле является обязательным для заполнения"
            }
        })
    } else if (email.trim() === "" || re.test(String(email).toLowerCase()) === false) {
        res.status(500).json({
            status: "error",
            message: {
                email: "Неверный email"
            }
        })
    } else if (text.trim() === "") {
        res.status(500).json({
            status: "error",
            message: {
                text: "Поле является обязательным для заполнения"
            }
        })
    } else if (isNaN(status)) {
        res.status(500).json({
            status: "error",
            message: {
                status: "Неверный status"
            }
        })
    } else {
        const body = {
            username,
            email,
            text,
            status
        }
        Task.update(body, {where: {id: id}})
            .then((response) => {
                if (response[0]) {
                    res.status(200).json({
                        status: "ok",
                    })

                } else {
                    res.status(500).json({
                        status: "error",
                        message: {
                            message: "Не найдена такая задача"
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

}
exports.getStatusTaskList = (req, res) => {
    TaskStatus.findAll(
        {
            attributes: ["name", "value"],
        }
    )
        .then(statusList => {
            res.status(200).json({
                status: "ok",
                message: statusList
            })
        }).catch(() => {
        res.status(500).json({
            status: "error",
            message: {
                message: "Ошибка сервера"
            }
        })
    })

}
