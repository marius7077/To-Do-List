const { Tasks } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const {auth} = require('../auth/auth')

module.exports = (app) => {
    app.put('/api/tasks/:id', auth, (req, res) => {
        const id = req.params.id
        Tasks.update(req.body, {
            where: {
                id: id
            }})
            .then(_ => {
                return Tasks.findByPk(id)
                    .then(task => {
                        if (task === null) {
                            const message = `Le tâche demandée n\'existe pas. Réessayer avec un autre identifiant.`
                            res.status(404).json({message})
                          }
                          const message = `La tâche ${task.name} a bien été modifiée`
                            res.json({message, data: task})
                        })
            })
            .catch(error => {
                if (error instanceof ValidationError){
                    return res.status(500).json({message: error.message , data: error})
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = `La tâche n'a pas été modifié . Réessayez dans quelques instants`
                res.status(500).json({message, data: error})
            })
    })
}