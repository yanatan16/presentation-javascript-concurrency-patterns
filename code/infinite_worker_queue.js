#!/usr/bin/env ./run.js

var queue = new (require('events').EventEmitter)

// START OMIT
queue.on('job', doWork) // No queue needed // HL

function doWork(j) {
  setTimeout(console.log.bind(console, 'job ' + j + ' done'), Math.floor(Math.random() * 3000))
}

var job = 1
function putWork() {
  for (var i = 0, n = Math.random() * 10; i < n; i++)
    queue.emit('job', job++) // HL
  setTimeout(putWork, Math.floor(Math.random() * 1000))
}

putWork()
// END OMIT