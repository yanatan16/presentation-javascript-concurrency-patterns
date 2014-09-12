#!/usr/bin/env ./run.js



// START OMIT
var async = require('async') // HL
  , start = Date.now()

async.series([ // HL
  simulateTask.bind(null, 500),
  simulateTask.bind(null, 500)
], function (err, result) {
  console.log('finished in ' + (Date.now() - start) + ' ms')
})

function simulateTask(time, cb) {
  async.parallel([ // HL
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