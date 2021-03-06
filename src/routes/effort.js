var model = require('../sequelize/models');

module.exports = {
	getOne: function (request, reply) {
		reply(model.Effort.findAll({
			attributes: ['id', 'name', 'description', 'type', 'mode'],
			where: {id: request.params.effort},
			include: [
				{
					model: model.Person,
					attributes: ['id', 'name'],
					through: {attributes: []}
				}
			]
		}));
	},
	create: function (request, reply) {
		model.Effort.create({
			name: request.payload.name,
			description: request.payload.description,
			type: request.payload.type,
			mode: request.payload.mode
		}).then(function(effort){
			//add people
			var idlist = request.payload.people.map(function(p){
				return p.id;
			});
			return model.Person.findAll({
				attributes: ['id'],
				where: {id: {in: idlist}}
			}).then(function(foundpeople){
				effort.setPeople(foundpeople);
				return effort;
			}).then(function(effort){
				//add task
				model.Task.findAll({
					attributes: ['id'],
					where: {id: request.payload.task},
				}).then(function(task){
					effort.addTask(task[0]).then(function(){
						reply(effort);
					});
				});
			});
		});
	},

	update: function(request, reply) {
		model.Effort.find({
			attributes: ['id'],
			where: {id: request.params.effort}
		}).then(function(effort){
			effort.updateAttributes({
				name: request.payload.name,
				description: request.payload.description,
				type: request.payload.type,
				mode: request.payload.mode
			});

			var idlist = request.payload.people.map(function(p){
				return p.id;
			});
			model.Person.findAll({
				attributes: ['id'],
				where: {id: {in: idlist}}
			}).then(function(foundpeople){
				effort.setPeople(foundpeople);
				reply(effort);
			});
		});
	},

	delete: function(request, reply) {
		model.Effort.find({
			attributes: ['id'],
			where: {id: request.params.effort},
			include: [
				{
					model: model.Task,
					attributes: ['id'],
					through: {attributes: []}
				}
			]
		}).then(function(effort){
			for(var i in effort.Tasks){
				effort.Tasks[i].removeEffort(effort);
			}

			//effort.destroy();
			reply(effort);
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
	},
	//addPerson: function (request, reply) {

	//	model.Effort.find({
	//		where: {id: request.params.effort},
	//	}).then(function(effort){
	//		console.log(request.payload.person);
	//		model.Person.findOrCreate({
	//			where: {name: request.payload.person},
	//		}).then(function(person){
	//			effort.addPerson(person[0]);
	//			reply(effort);
	//		});
	//	});
	//},
	//removePerson: function (request, reply) {
	//	model.Effort.find({
	//		where: {id: request.params.effort},
	//	}).then(function(effort){
	//		model.Person.findAll({
	//			where: {name: request.payload.person},
	//		}).then(function(person){
	//			effort.removePerson(person[0]);
	//			reply(person);
	//		});
	//	});
	//}
};
