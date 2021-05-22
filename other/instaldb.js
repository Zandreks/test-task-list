const db = require("../models/index")
const User = db.user;
const StatusTask = db.statusTask;
const bcrypt = require("bcryptjs");

const initial =()=> {
    User.create({
        name:"Admin",
        surname:"System",
        username:"admin",
        password:bcrypt.hashSync("123", 8),
    })
    StatusTask.create({
        name:"Задача не выполнена",
        value:0,
    })
    StatusTask.create({
        name:"Задача не выполнена, отредактирована админом",
        value:1,
    })
    StatusTask.create({
        name:"Задача выполнена",
        value:10,
    })
    StatusTask.create({
        name:"Задача отредактирована админом и выполнена",
        value:11,
    })
}
module.exports = initial
