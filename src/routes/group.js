var model = require('../model');

module.exports = {
	getAll: function (request, reply) {
		reply(model.Group.findAll({
			attributes: ['id', 'name']
		}));
	},
	getOne: function (request, reply) {
		reply(model.Group.findAll({
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
		reply(model.Group.create({
			name: request.payload.name
		}));
	}
};
