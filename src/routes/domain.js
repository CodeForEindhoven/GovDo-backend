var model = require('../sequelize/models');

module.exports = {
	getAll: function (request, reply) {
		reply(model.Domain.findAll({
			attributes: ['id', 'name'],
			include: [
				{
					model: model.Program,
					attributes: ['id', 'name'],
					through: {attributes: []}
				}
			]
		}));
	},

	create: function (request, reply) {
		reply(model.Domain.create({
			name: request.payload.name,
		}));
	},

	addProgram: function (request, reply) {
		model.Domain.find({
			where: {id: request.params.domain},
		}).then(function(domain){
			model.Program.find({
				where: {id: request.payload.program},
			}).then(function(program){
				domain.addProgram(program);
				reply(domain);
			});
		});
	},
};
