var fs = require('fs');
var model = {};

fs.readFile('data.json', {encoding: "utf8"}, function(err, data){
	if(err){console.log(err);}
	model = JSON.parse(data);
	console.log(model);
});

function save(){
	fs.writeFile('data.json', JSON.stringify(model, null, 2), function(err){
		if(err){console.log(err);}
	});
}

function addTask(title){
	model.tasks.push({
		title: title,
		efforts: []
	});
	save();
	return model;
}

function addEffort(task, title){
	model.tasks[task].efforts.push({
		title: title,
		people: [],
		type: ""
	});
	save();
	return model;
}

function addEffortPerson(task, effort, person){
	model.tasks[task].efforts[effort].people.push(person);
	save();
	return model;
}

function get(){
	return model;
}

module.exports = {
	addTask: addTask,
	addEffort: addEffort,
	addEffortPerson: addEffortPerson,
	get: get
};
