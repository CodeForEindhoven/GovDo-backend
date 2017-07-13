'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn('Tasks','mode', Sequelize.INTEGER);
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Tasks','mode');
	}
};
