var model = require('../sequelize/models');

module.exports = {
	getRecentChanges: function (request, reply) {
		reply(model.Effort.findAll({
			attributes: ['id', 'name', 'updatedAt', 'createdAt'],
			limit: 10,
			order: '"updatedAt" DESC',
			include: [
				{
					model: model.Task,
					attributes: ['id', 'name'],
					through: {attributes: []},
					include: [
						{
							model: model.Program,
							attributes: ['id', 'name'],
							through: {attributes: []},
						}
					]
				}
			]
		}));
	},

	getAllEfforts: function(request, reply) {
		reply(model.Effort.findAll({
			where: {
				$or: {
					name: {like: "%"+request.payload.query+"%"},
					description: {like: "%"+request.payload.query+"%"}
				}
			},
			attributes: ['id', 'name', 'description'],
			limit: 20,
			include: [
				{
					model: model.Task,
					attributes: ['id', 'name'],
					through: {attributes: []},
					include: [
						{
							model: model.Program,
							attributes: ['id', 'name'],
							through: {attributes: []},
						}
					]
				}
			]
		}));
	}
};
