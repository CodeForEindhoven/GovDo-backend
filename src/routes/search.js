var model = require('../sequelize/models');

module.exports = {
	getRecentChanges: function (request, reply) {
		reply(model.Effort.findAll({
			attributes: ['id', 'name', 'updatedAt', 'createdAt'],
			limit: 10,
			order: '"updatedAt" DESC'
		}));
	},
};
