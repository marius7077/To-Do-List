const typeList = ['Software', 'Hardware', 'Build', 'Dev', 'Run']
const userModel = require('../models/user')

module.exports = (sequelize, DataTypes) => {
    const Task =  sequelize.define('Task', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'La tâche existe déjà !'
            },
            validate: {
                notEmpty: {
                    msg: 'Le nom est requis !'
                },
                notNull: {
                    msg: 'Le nom est requis !'
                }
            }
        },
        deadline: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {msg : 'La deadline est requise !'},
                isDate: {
                    msg: `Le format date doit être respoecté ! year-mouth-day`
                },
                createDateAfterDeadLine(value) {
                    if (new Date(value) < new Date){
                        throw new Error(`l'échéance doit être supérieur à la date de création de la tâche !`)
                    }
                }
            }
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate:{
                isBool(value) {
                    if(typeof(value) != 'boolean') {
                        throw new Error(`Le champ completed doit être un boolean, true ou false`)
                    }
                }
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Le type est requis !'
                },
                notNull: {
                    msg: 'Le type est requis !'
                },
                isList(value) {
                    if(!typeList.includes(value)){
                        throw new Error(`${value} n'est pas dans la liste des types : ${typeList}`)
                    }
                }
            }
        }
    })

    const User = userModel(sequelize,DataTypes)
    User.hasMany(Task)
    Task.belongsTo(User)
    
    return Task
}
