#!/usr/bin/env ./run.js

// START OMIT
chat('ping', {every: 700})
chat('       pong', {every: 1000})

function chat(str, opts) {
  setInterval(function () { // HL
    console.log(str)
  }, opts.every)
}
// END OMIT