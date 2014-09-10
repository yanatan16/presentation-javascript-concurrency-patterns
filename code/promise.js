#!/usr/bin/env ./run.js

var Q = require('q')

// START OMIT
var start = Date.now()
simulateTask(500).then(function () {
  return simulateTask(500)
}).then(function () {
  console.log('finished in ' + (Date.now() - start) + ' ms')
})

function simulateTask(time) {
  return Q.all([timedTask(time), timedTask(time)])
}
//END OMIT

function timedTask(time) {
  var deferred = Q.defer()
  setTimeout(function () {
    console.log('finished ' + time + ' ms task')
    deferred.resolve()
  }, time)
  return deferred.promise
}