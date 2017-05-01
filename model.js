var Sequelize = require('sequelize');
var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

var Program = sequelize.define('Program', {
	name: Sequelize.STRING,
});

var Task = sequelize.define('Task', {
	name: Sequelize.STRING,
});

var Effort = sequelize.define('Effort', {
	name: Sequelize.STRING,
});

Program.belongsToMany(Task, {through: 'ProgramTask'});
Task.belongsToMany(Program, {through: 'ProgramTask'});

Task.belongsToMany(Effort, {through: 'TaskEffort'});
Effort.belongsToMany(Task, {through: 'TaskEffort'});

var Person = sequelize.define('Person', {
	name: Sequelize.STRING,
});

Person.belongsToMany(Effort, {through: 'PeopleEffort'});
Effort.belongsToMany(Person, {through: 'PeopleEffort'});

/*
var Group = sequelize.define('Group', {
	name: Sequelize.STRING,
});



var Misson = sequelize.define('Misson', {
	name: Sequelize.STRING,
});









Group.belongsToMany(Person, {through: 'GroupPerson'});
Person.belongsToMany(Group, {through: 'GroupPerson'});

Misson.belongsToMany(Task, {through: 'MissonTask'});
Task.belongsToMany(Misson, {through: 'MissonTask'});
*/

function run(callback){
	sequelize.sync().then(function(){
		//sequelize.Promise.all([
		//	Task.create({name:"task1"}),
		//	Group.create({name: "group3"})
		//]).spread(function (task, group) {
		//	return group.addTask(task).return(task);
		//});
	}).then(callback);
}

module.exports = {
	Program: Program,
	Task: Task,
	Effort: Effort,
	//Person: Person,
	//Group: Group,
	//Misson: Misson,


	run: run
};


//sequelize.sync().then(function() {
//	  sequelize.Promise.all([
//	    Task.create({name:"task1"}),
//	    Effort.create({name: "effort1"})
//	  ]).spread(function (task, effort) {
//	    return task.addEffort(effort).return(task);
//	  }).then(function(task) {
//	    // Get the association
//	    return task.getEfforts();
//	  }).then(function(efforts) {
//	    console.log(efforts);
//	  });
//  });
//
