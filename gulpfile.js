'use strict';

var fs = require('fs'),
    tasks = fs.readdirSync('./tasks/');

global.dist = false;

tasks.forEach(function(task) {
  if(task.slice(-3) != '.js') return;
  require('./tasks/' + task);
});
