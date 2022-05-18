const { ValidationError } = require('sequelize')
const { Tasks, Users, Comments } = require('../../db/sequelize')
const {auth} = require('../../auth/auth')
const login = require('../Authentification/login')

module.exports = (app) => {
    app.post('/api/comments', auth, (req, res) => {
            req.body.UserId = req.currentUser
            const TaskId = req.query.TaskId
            Tasks.findByPk(TaskId)
            .then(task => {
                    req.body.TaskId = task.id
                })
                .catch(error => {
                    const message = 'Vous devez spécifié le TaskId'
                    res.status(404).json({message, data: error})
                })
            Comments.create(req.body)
            .then(comment => {
                comment.set({
                    UserId:req.currentUser,
                    TaskId:req.body.TaskId
                })
                comment.save();
                const message = 'Le commentaire a bien été créée !'
                res.json({message, data: comment})
            }).catch(error => {
                if (error instanceof ValidationError){
                    return res.status(500).json({message: error.message , data: error})
                }
                const message = `Le commentaire n'a pas été ajouté. Réessayez dans quelques instants.`
                res.status(500).json({message, data: error})
            })
        })
        
    }