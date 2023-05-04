const mongoose = require('mongoose') 


const Tareas = mongoose.model('Tarea', {
	name: { type: String, required: true, minLength: 2 },
})

module.exports = Tareas
