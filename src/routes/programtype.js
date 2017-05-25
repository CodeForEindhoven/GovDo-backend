var model = require('../model');

module.exports = {
	getAll: function (request, reply) {
		reply(model.ProgramType.findAll({
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
		reply(model.ProgramType.create({
			name: request.payload.name,
		}));
	},

	addProgram: function (request, reply) {
		model.ProgramType.find({
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
