var Graph = require("graphlib").Graph;

// Create a new directed graph
var g = new Graph();

g.setNode("c", { k: 123 });

// What nodes are in the graph?
console.log(g.node("c"));
