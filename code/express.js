#!/usr/bin/env ./run.js

var express = require('express')
  , app = express()
  , reqs = 0

// START1 OMIT
app.use(logRequest) // HL
   .use(getDbData) // HL
   .get('/', function (req, res, next) { res.json(req.data) })
//END1 OMIT
//START2 OMIT
function logRequest(req, res, next) { // HL
  var num = reqs++
  next() // HL
  setImmediate(function () {
    console.log('got request', num, req.url)
  })
}

function getDbData(req, res, next) { // HL
  setTimeout(function () {
    req.data = {fake: {db: 'data'}},
    next() // HL
  })
}
// END2 OMIT

app.listen(3998, function () {
  require('request')('http://localhost:3998/', function (err, resp, body) {
    console.log('response', resp.statusCode, body)
  })
})