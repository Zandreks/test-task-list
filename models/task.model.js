module.exports = (sequelize, DataTypes) => {
    return sequelize.define("task", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'status_tasks',
                key: 'value',
            }
        }
    })
};
