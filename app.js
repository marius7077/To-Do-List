const express = require('express')
const morgan = require ('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const app = express()
const port = process.env.PORT || 3000

//Middleware
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev')) 
    .use(bodyParser.json())

//Initialisation de la base
sequelize.initDb()

//Point de terminaison
app.get('/', (req, res) => res.send('Hello World!'))
require('./src/routes/Tasks/findAllTasks')(app)
require('./src/routes/Tasks/findTasksByPk')(app)
require('./src/routes/Tasks/deleteTasks')(app)
require('./src/routes/Tasks/createTasks')(app)
require('./src/routes/Tasks/updateTasks')(app)
require('./src/routes/Comments/createComments')(app)
require('./src/routes/Comments/findAllComments')(app)
require('./src/routes/Authentification/login')(app)


app.listen(port, () => console.log(`Example app listening on port ${port}`))