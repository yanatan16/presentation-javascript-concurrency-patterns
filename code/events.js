#!/usr/bin/env ./run.js

var events = require('events')
  , reactor = new events.EventEmitter()
  , state = { x: 0, y: 0 }

reactor.on('loop', function (n) {
  console.log('begin game loop', n)
  if (n < 4)
    setTimeout(reactor.emit.bind(reactor, 'loop', n+1), 1000)
})

//START OMIT

reactor.on('draw', function () { // HL
  console.log('drawing', state)
})

reactor.on('change', function (name, val) { // HL
  state[name] = val
  reactor.emit('draw') // HL
})

reactor.on('loop', function (n) { // HL
  if (n === 1)
    reactor.emit('change', 'x', 1) // HL
  else if (n === 2)
    reactor.emit('change', 'y', 10) // HL
})

reactor.emit('loop', 0)

//END OMIT