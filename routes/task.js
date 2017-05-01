var model = require('../model');

module.exports = {
	//getOne: function (request, reply) {
	//	reply(model.Task.findAll({
	//		attributes: ['id', 'name'],
	//		where: {id: request.params.id},
	//		include: [
	//			{
	//				model: model.Group,
	//				attributes: ['id', 'name'],
	//				through: {attributes: []}
	//			},
	//			{
	//				model: model.Effort,
	//				attributes: ['id', 'name'],
	//				through: {attributes: []}
	//			}
	//		]
	//	}));
	//},
	create: function (request, reply) {
		model.Task.create({
			name: request.payload.name
		}).then(function(task){
			model.Program.findAll({
				attributes: ['id'],
				where: {id: request.params.program},
			}).then(function(program){
				task.addProgram(program[0]);
				reply(task);
			});
		});
	}
};
