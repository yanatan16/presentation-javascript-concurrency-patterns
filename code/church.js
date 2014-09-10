#!/usr/bin/env ./node.sh

//START OMIT
function zero() { return 0 }

function incr(f) {
  return function () {
    return f() + 1
  }
}

function add(f, g) {
  return function () {
    return f() + g()
  }
}

var one = incr(zero)
  , two = add(one, one)
  , three = add(one, two)
  , four = add(two, two)

console.log(one(), two(), three(), four())
//END OMIT