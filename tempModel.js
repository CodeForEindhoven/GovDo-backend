var fs = require('fs');
var model = {};

fs.readFile('data.json', {encoding: "utf8"}, function(err, data){
	if(err){console.log(err);}
	model = JSON.parse(data);
	console.log(model);
});

function save(){
	fs.writeFile('data.json', JSON.stringify(model), function(err){
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
		people: []
	});
	save();
	return model;
}

function get(){
	return model;
}

module.exports = {
	addTask: addTask,
	addEffort: addEffort,
	get: get
};
