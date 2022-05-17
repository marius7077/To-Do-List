const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Tasks, Users } = require('../db/sequelize')
const {auth} = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/tasks', auth, (req, res) => {
            Tasks.create(req.body)
            .then(task => {
                task.set({
                    UserId:req.currentUser
                })
                task.save();
                const message = 'La tâche a bien été créée !'
                res.json({message, data: task})
            }).catch(error => {
                if (error instanceof ValidationError){
                    return res.status(500).json({message: error.message , data: error})
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = `La tâche n'a pas été ajouté. Réessayez dans quelques instants.`
                res.status(500).json({message, data: error})
            })
        })
        
    }