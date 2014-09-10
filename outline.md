# Javascript Concurrency Patterns

## Intro

- What is concurrency?

- Concurrency vs Parallelism

  > Concurrency is not parallelism, although it enables parallelism.
  > If you have only one processor, your program can still be concurrent but it cannot be parallel.

Rob Pike, 2012

- Single-threaded concurrency

## Some Javascript

- Basic concurrency primitives in Javascript

Asynchronous allows concurrency!

```javascript
setTimeout(callback, time)
require('fs').readFile(fn, callback)
$.ajax({url: url, success: successCallback})
```

- Anti-patterns

```javascript
require('fs').readFileSync(fn)
while (someConditional()) { /* just wait */ }
```

Callback hell
```javascript
setTimeout(function () {
  $.ajax({url: '/whatever',
          success: function (data) {
            $('body').on('some-event', function () {
               $('body').html(data)
            })
          },
          error: function (err) {
            $('body').emit('error', err)
          })
}, 1000)
```

- async.js

```javascript
var async = require('async')
async.parallel([ task1, task2, task3 ], callback)
async.series([ task1, task2, task3 ], callback)
async.waterfall([ intial, second, third ], callback)
async.auto({}) // go look up docs
```

- Promises

Many implementations

```javascript
somePromise.then(function () {
  return someOtherPromise
})
```

I don't like it because flow-control isn't solved, just callback nesting. So I prefer `async.js`

## Concurrency Patterns

- Flow Control
- Events
- Infinite Worker Queue
- Finite Worker Queue

## Examples

- Web crawler