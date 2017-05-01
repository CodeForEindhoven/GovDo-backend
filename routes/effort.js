var model = require('../model');

module.exports = {
	getOne: function (request, reply) {
		reply(model.Task.findAll({
			attributes: ['id', 'name'],
			where: {id: request.params.id},
			include: [
				{
					model: model.Task,
					attributes: ['id', 'name'],
					through: {attributes: []}
				},
				{
					model: model.Person,
					attributes: ['id', 'name'],
					through: {attributes: []}
				}
			]
		}));
	},
	create: function (request, reply) {
		reply(model.Task.create({
			name: request.payload.name
		}));
	}
};
