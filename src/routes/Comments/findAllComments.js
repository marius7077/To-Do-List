const { Comments } = require('../../db/sequelize')
const { Op } = require("sequelize")
const {auth} = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/comments', auth, (req,res) => {
        const limit = req.query.limit || 20
        const TaskId = req.query.TaskId
        if(TaskId){
            return Comments.findAndCountAll({
                where: {
                    TaskId: {
                    [Op.eq]: TaskId
                    }
                },
                order: ['createdAt'],
                limit: limit
            })
            .then(({count, rows}) => {
                const message = `Nous avons trouvé ${count} résultats pour ${TaskId}`
                res.json({message, data: rows})
            })
        }
        Comments.findAll({limit: limit})
            .then(comments => {
                const message = 'La liste des commentaires a bien été retournée'
                res.json({message, data: comments})
            })
            .catch(error => {
                const message = `La liste n'a pas été trouvée. Réessayez dans quelques instants`
                res.status(404).json({message, data: error})
            })
    })
}