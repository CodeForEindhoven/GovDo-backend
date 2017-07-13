'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn('Efforts','mode', {
			type: Sequelize.INTEGER,
			defaultValue: 0
		});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Efforts','mode');
	}
};
