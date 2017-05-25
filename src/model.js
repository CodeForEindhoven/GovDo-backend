var config = require("./config");

var Sequelize = require('sequelize');
var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.storage
});

var ProgramType = sequelize.define('ProgramType', {
	name: Sequelize.STRING,
});

var Program = sequelize.define('Program', {
	name: Sequelize.STRING,
	mission: Sequelize.STRING
});

var Task = sequelize.define('Task', {
	name: Sequelize.STRING,
});

var Effort = sequelize.define('Effort', {
	name: Sequelize.STRING,
	type: {
		type: Sequelize.INTEGER,
		defaultValue: -1
	}
});

var Person = sequelize.define('Person', {
	name: Sequelize.STRING,
});

ProgramType.belongsToMany(Program, {through: 'ProgramTypeProgram'});
Program.belongsToMany(ProgramType, {through: 'ProgramTypeProgram'});

Program.belongsToMany(Task, {through: 'ProgramTask'});
Task.belongsToMany(Program, {through: 'ProgramTask'});

Task.belongsToMany(Effort, {through: 'TaskEffort'});
Effort.belongsToMany(Task, {through: 'TaskEffort'});

Person.belongsToMany(Effort, {through: 'PeopleEffort'});
Effort.belongsToMany(Person, {through: 'PeopleEffort'});

function run(callback){
	sequelize.sync().then(function(){

	}).then(callback);
}

module.exports = {
	ProgramType: ProgramType,
	Program: Program,
	Task: Task,
	Effort: Effort,
	Person: Person,

	run: run
};
