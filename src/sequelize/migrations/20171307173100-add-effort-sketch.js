'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn('Efforts','mode', Sequelize.INTEGER);
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Efforts','mode');
	}
};
