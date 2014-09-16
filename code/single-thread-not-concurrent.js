#!/usr/bin/env ./run.js

// START OMIT
chat('ping', {every: 700})
chat('       pong', {every: 1000})

function chat(str, opts) {
  var last = 0;
  while (true) {
    if (Date.now() - last > opts.every) {
      last = Date.now()
      console.log(str)
    }
  }
}
// END OMIT