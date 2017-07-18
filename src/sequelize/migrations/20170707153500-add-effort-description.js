'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn('Efforts','description', {
			type: Sequelize.STRING,
			defaultValue: ""
		});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Efforts','description');
	}
};
