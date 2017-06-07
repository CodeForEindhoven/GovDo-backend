'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn('Tasks','means', Sequelize.STRING);
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Tasks', 'means');
	}
};
