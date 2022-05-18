const taskModel = require('./task')
const userModel = require('./user')



module.exports = (sequelize, DataTypes) => {
    const User = userModel(sequelize,DataTypes)
    const Task = taskModel(sequelize,DataTypes)

    const Comment = sequelize.define('Comment', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Le message est requis !'
                },
                notNull: {
                    msg: 'Le message est requis !'
                }
            },
                createdDate: {
                    type: DataTypes.DATETIME,
                    defaultValue: DataTypes.NOW
                }
            },
            TaskId:{
                type: DataTypes.INTEGER,
                references: {
                    model: Task,
                    key: 'id'
                  }
            }
        })

    User.hasMany(Comment)
    Task.hasMany(Comment)

    return Comment

}