'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.changeColumn('Efforts','name', {
			type: Sequelize.STRING,
			defaultValue: ""
		});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.changeColumn('Efforts','name', Sequelize.STRING);
	}
};
