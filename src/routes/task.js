var model = require('../sequelize/models');

module.exports = {
	getOne: function (request, reply) {
		reply(model.Task.find({
			attributes: ['id', 'name', 'means', 'kpi', 'mode'],
			where: {id: request.params.task},
			include: [
				{
					model: model.Effort,
					attributes: ['id', 'name', 'description', 'endproduct', 'type', 'mode'],
					through: {attributes: []},
					include: [
						{
							model: model.Person,
							attributes: ['id', 'name'],
							through: {attributes: []}
						}
					]
				}
			]
		}));
	},

	create: function (request, reply) {
		model.Task.create({
			name: request.payload.name,
			means: request.payload.means,
			kpi: request.payload.kpi,
			mode: request.payload.mode
		}).then(function(task){
			model.Program.findAll({
				attributes: ['id'],
				where: {id: request.payload.program},
			}).then(function(program){
				task.addProgram(program[0]).then(function(){
					reply(task);
				});
			});
		});
	},

	update: function(request, reply) {
		model.Task.find({
			attributes: ['id'],
			where: {id: request.params.task}
		}).then(function(task){
			task.updateAttributes({
				name: request.payload.name,
				means: request.payload.means,
				kpi: request.payload.kpi,
				mode: request.payload.mode
			});
			reply(task);
		});
	},

	delete: function(request, reply) {
		model.Task.find({
			attributes: ['id'],
			where: {id: request.params.task},
			include: [
				{
					model: model.Program,
					attributes: ['id'],
					through: {attributes: []}
				},
				{
					model: model.Effort,
					attributes: ['id'],
					through: {attributes: []}
				}
			]
		}).then(function(task){
			for(var i in task.Programs){
				task.Programs[i].removeTask(task);
			}
			for(var j in task.Efforts){
				task.Efforts[j].removeTask(task);
			}

			//task.destroy();
			reply(task);
		});
	},

	addEffort: function (request, reply) {
		model.Task.find({
			where: {id: request.params.task},
		}).then(function(task){
			model.Effort.find({
				where: {id: request.payload.effort},
			}).then(function(effort){
				task.addEffort(effort);
				reply(task);
			});
		});
	},

};
