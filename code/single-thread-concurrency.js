#!/usr/bin/env ./node.sh

// START OMIT
setInterval(chat('ping'), 700)
setInterval(chat('       pong'), 1000)

function chat(str) {
  return function () {
    console.log(str)
  }
}
// END OMIT