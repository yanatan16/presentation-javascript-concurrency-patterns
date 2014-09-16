#!/usr/bin/env ./run.js

// START1 OMIT
function InfiniteQueue(worker) {
  return {
    push: function (task) {
      worker(task)
    }
  }
}
// END1 OMIT

var queue = InfiniteQueue(doWork)

// START2 OMIT
function doWork(j) {
  setTimeout(console.log.bind(console, 'job ' + j + ' done'), Math.floor(Math.random() * 3000))
}

var job = 1
function putWork() {
  for (var i = 0, n = Math.random() * 100; i < n; i++)
    queue.push(job++) // HL
  setTimeout(putWork, Math.floor(Math.random() * 1000))
}
// END2 OMIT

putWork()