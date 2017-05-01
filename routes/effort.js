var model = require('../model');

module.exports = {
	getOne: function (request, reply) {
		reply(model.Effort.findAll({
			attributes: ['id', 'name'],
			where: {id: request.params.effort},
			//include: [
			//	{
			//		model: model.Person,
			//		attributes: ['id', 'name'],
			//		through: {attributes: []}
			//	}
			//]
		}));
	},
	create: function (request, reply) {
		model.Effort.create({
			name: request.payload.name
		}).then(function(effort){
			model.Task.findAll({
				attributes: ['id'],
				where: {id: request.params.task},
			}).then(function(task){
				effort.addTask(task[0]);
				reply(effort);
			});
		});
	}
};
