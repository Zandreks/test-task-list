const {Sequelize,DataTypes } = require("sequelize");
const sequelize = new Sequelize(`postgres://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@${process.env.HOST_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}`)
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, DataTypes);
db.task = require("./task.model")(sequelize, DataTypes);
db.statusTask = require("./status.task.model")(sequelize, DataTypes);

module.exports = db;
