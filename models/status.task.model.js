module.exports = (sequelize, DataTypes) => {
    return sequelize.define("status_task", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    })
};
