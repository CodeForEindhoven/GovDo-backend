'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn('Efforts','description', Sequelize.STRING);
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Efforts','description');
	}
};
