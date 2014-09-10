#!/usr/bin/env ./run.js


var async = require('async')

// START OMIT
var start = Date.now()
async.series([
  simulateTask.bind(null, 500),
  simulateTask.bind(null, 500)
], function (err, result) {
  console.log('finished in ' + (Date.now() - start) + ' ms')
})

function simulateTask(time, cb) {
  async.parallel([
    timedTask(time),
    timedTask(time)
  ], cb)
}
//END OMIT

function timedTask(time) {
  return function (cb) {
    setTimeout(function () {
      console.log('finished ' + time + ' ms task')
      cb()
    }, time)
  }
}