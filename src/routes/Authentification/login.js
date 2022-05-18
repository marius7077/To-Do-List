const { Users } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../../auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req,res) => {
        Users.findOne({
            where: {
                username: req.body.username
            }
        }).then(user => {

            if(user == null){
                const message = `L'utilisateur n'existe pas !'`
                res.status(404).json({message})
            }

            bcrypt.compare(req.body.password, user.password)
            .then(isPasswordValided => {
                if(!isPasswordValided) {
                    const message = `Le mot de passe est incorrect !`
                    res.status(401).json({message})
                }

                //JWT
                const token = jwt.sign(
                    {userId: user.id},
	                privateKey,
	                {expiresIn: '24h'}
                )
                
                const message = `L'utilisateur a bien été identifié !`
                res.json({message, data: {user, token}})
            })
        })
    })
}