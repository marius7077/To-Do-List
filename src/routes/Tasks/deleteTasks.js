const { Tasks } = require('../../db/sequelize')
const {auth} = require('../../auth/auth')

module.exports = (app) => {
    app.delete('/api/tasks/:id', auth, (req, res) => {
        Tasks.findByPk(req.params.id)
            .then(task => {
                if (task === null){
                    const message = `La tâche n'existe pas !`
                    res.status(404).json({message})
                }

                const deletedTask = task
                return Tasks.destroy({
                    where: {
                        id: task.id
                    }
                }).then(_ => {
                    const message = `La tâche n°${deletedTask.id} a bien été supprimée !`
                    res.json({message, data: deletedTask})
                })
            }
            ).catch(error => {
                const message = `La tâche n'a pas supprimé. Réessayez dans quelques instants`
                res.status(500).json({message, data: error})
            })
    })
}