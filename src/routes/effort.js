var model = require('../model');

module.exports = {
	getOne: function (request, reply) {
		reply(model.Effort.findAll({
			attributes: ['id', 'name', 'type'],
			where: {id: request.params.effort},
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
	},
	setType: function (request, reply) {
		model.Effort.update(
  			{ type: request.payload.type },
  			{ where: {id: request.params.effort} }
		).then(function(updated){
			console.log(updated);
			reply(updated);
		});
	}
};
