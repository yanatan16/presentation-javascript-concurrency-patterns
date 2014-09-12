#!/usr/bin/env ./run.js

var Q = require('q')

// START OMIT
var start = Date.now()
simulateTask(500).then(function () { // HL
  return simulateTask(500)
}).then(function () { // HL
  console.log('finished in ' + (Date.now() - start) + ' ms')
})

function simulateTask(time) {
  return Q.all([timedTask(time), timedTask(time)]) // HL
}
//END OMIT

function timedTask(time) {
  var deferred = Q.defer() // HL
  setTimeout(function () {
    console.log('finished ' + time + ' ms task')
    deferred.resolve()
  }, time)
  return deferred.promise // HL
}