const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Tarea = require('./tarea.controller')
const { Auth, isAuthenticated } = require('./auth.controller')
const port = 3000

mongoose.connect('mongodb+srv://felipe:elpipepon00@cluster0.laqngnr.mongodb.net/ListaTareas?retryWrites=true&w=majority')

app.use(express.json())

app.get('/tareas', isAuthenticated, Tarea.list)
app.post('/tareas', isAuthenticated, Tarea.create)
app.put('/tareas/:id', isAuthenticated, Tarea.update)
app.patch('/tareas/:id', isAuthenticated, Tarea.update)
app.delete('/tareas/:id', isAuthenticated, Tarea.destroy)

app.post('/login', Auth.login)
app.post('/register', Auth.register)


app.use(express.static('app'))

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})
app.get('*', (req, res) => {
	res.status(404).send('Esta página no existe :(')
})

app.listen(port, () => {
	console.log('Arrancando la aplicación!')
})
