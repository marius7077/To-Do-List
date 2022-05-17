const { Tasks } = require('../db/sequelize')
const { Op } = require("sequelize")
const {auth} = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/tasks', auth, (req,res) => {
        const limit = req.query.limit || 5
        if(req.query.name){
            const name = req.query.name
            if (name.length==1){
                const message = `La rechercher par nom est à partir de deux caractères !`
                res.status(404).json({message})
            }
            return Tasks.findAndCountAll({
                where: {
                    name: {
                    [Op.substring]: name
                    }
                },
                limit: limit
            })
            .then(({count, rows}) => {
                const message = `Nous avons trouvé ${count} résultats pour ${name}`
                res.json({message, data: rows})
            })
        }
        Tasks.findAll({limit: limit})
            .then(tasks => {
                const message = 'La liste des tâches a bien été retournée'
                res.json({message, data: tasks})
            })
            .catch(error => {
                const message = `La liste n'a pas été trouvée. Réessayez dans quelques instants`
                res.status(404).json({message, data: error})
            })
    })
}