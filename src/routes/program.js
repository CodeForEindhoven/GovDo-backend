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

	update: function(request, reply) {
		model.Program.find({
			attributes: ['id', 'name'],
			where: {id: request.params.program}
		}).then(function(program){
			program.updateAttributes({
				name: request.payload.name
			});
			reply(program);
		});
	},

	delete: function(request, reply) {
		model.Program.destroy({
			where: {id: request.params.program}
		}).then(function(data){
			reply(data);
		});
	},

	getOne: function (request, reply) {
		reply(model.Program.find({
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
