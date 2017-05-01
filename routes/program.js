var model = require('../model');

module.exports = {
	getAll: function (request, reply) {
		reply(model.Program.findAll({
			attributes: ['id', 'name']
		}));
	},

	create: function (request, reply) {
		reply(model.Program.create({
			name: request.payload.name
		}));
	},

	getOne: function (request, reply) {
		reply(model.Program.findAll({
			attributes: ['id', 'name'],
			where: {id: request.params.program},
			include: [
				{
					model: model.Task,
					attributes: ['id', 'name'],
					through: {attributes: []}
				}
			]
		}));
	},
};
