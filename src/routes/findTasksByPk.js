const { Tasks } = require('../db/sequelize')
const {auth} = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/tasks/:id', auth, (req, res) =>{
        Tasks.findByPk(req.params.id)
            .then(task => {
                if (task === null) {
                    const message = `La tâche n'existe pas !`
                    res.status(404).json({message})
                }
                const message = 'La tâche a été trouvée !'
                res.json({message, data: task})
            })
            .catch(error => {
                const message = `La tâche n'a pas été trouvée !, Réessayez dans quelques instants ! `
                res.status(500).json({message, data: error})
            })
    })
}

