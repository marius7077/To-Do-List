const { Sequelize, DataTypes } = require('sequelize')
const taskModel = require('../models/task')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')

//Configuration de connexion
const sequelize = new Sequelize('taskdb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        timezone: 'local'
    },
    logging: false
})

const Tasks = taskModel(sequelize, DataTypes)
const Users = userModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({ force: true })
        .then(async _ => {

            await bcrypt.hash('1234', 10).then(hash => {
                Users.create({ 
                    username: 'marius',
                    password: hash
                }).then(user => {
                    console.log(user.toJSON());
                })
            })

            Tasks.bulkCreate([{
                    name: 'Première tâche',
                    deadline: '2022-05-25',
                    type: 'Hardware'
                },
                {
                    name: 'Encore une tâche !',
                    deadline: '2022-12-25',
                    type: 'Dev'
                },
                {
                    name: 'Une Nouvelle tâche !',
                    deadline: '2022-12-25',
                    type: 'Dev'
                }]
            ).then(tasks => {
                tasks.forEach(task => console.log(task.toJSON()))
            })
            console.log('La base de données a bien été initialisée !');
        })
}

module.exports = {
    initDb, Tasks, Users
}