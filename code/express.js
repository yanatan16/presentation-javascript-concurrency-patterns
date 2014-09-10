#!/usr/bin/env ./node.sh

var express = require('express')
  , app = express()
  , reqs = 0

// START1 OMIT
app.use(logRequest)
   .use(getDbData)
   .get('/', function (req, res, next) { res.json(req.data) })
//END1 OMIT
//START2 OMIT
function logRequest(req, res, next) {
  var num = reqs++
  next()
  setImmediate(function () {
    console.log('got request', num, req.url)
  })
}

function getDbData(req, res, next) {
  setTimeout(function () {
    req.data = {fake: {db: 'data'}},
    next()
  })
}
// END2 OMIT

app.listen(3998, function () {
  require('request')('http://localhost:3998/', function (err, resp, body) {
    console.log('response', resp.statusCode, body)
  })
})