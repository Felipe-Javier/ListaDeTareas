const Tareas = require('./tarea.model')

const Tarea = {
	list: async (req, res) => {
		const tareas = await Tareas.find()
		res.status(200).send(tareas)
	},
	create: async (req, res) => {
		const tarea = new Tareas(req.body)
		await tarea.save()
		res.status(201).send('chanchito creado!')
	},
	update: async (req, res) => {
		res.status(204).send('actualizando chanchito')
	},
	destroy: async (req, res) => {
		const { id } = req.params
		const tarea = await Tareas.findOne({ _id: id })
    	await tarea.deleteOne()
		res.status(204).send('eliminando chanchito :(')
	}
}

module.exports = Tarea
