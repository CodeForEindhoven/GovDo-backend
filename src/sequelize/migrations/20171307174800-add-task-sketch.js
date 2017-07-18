'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn('Tasks','mode', {
			type: Sequelize.INTEGER,
			defaultValue: 0
		});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Tasks','mode');
	}
};
