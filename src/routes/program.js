var model = require('../sequelize/models');

module.exports = {
	getAll: function (request, reply) {
		reply(model.Program.findAll({
			attributes: ['id', 'name', 'mission']
		}));
	},

	create: function (request, reply) {
		console.log(request.payload);
		reply(model.Program.create({
			name: request.payload.name,
			mission: request.payload.mission
		}));
	},

	update: function(request, reply) {
		model.Program.find({
			attributes: ['id', 'name', 'mission'],
			where: {id: request.params.program}
		}).then(function(program){
			program.updateAttributes({
				name: request.payload.name,
				mission: request.payload.mission
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
			attributes: ['id', 'name', 'mission'],
			where: {id: request.params.program},
			include: [
				{
					model: model.Task,
					attributes: ['id', 'name', 'means'],
					through: {attributes: []}
				}
			]
		}));
	},
};
