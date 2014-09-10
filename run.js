#!/usr/bin/env node
var code = ''

process.stdin.setEncoding('utf8')
process.stdin.on('readable', function () {
  code += process.stdin.read()
})
process.stdin.on('end', function () {
  code = code.replace(/#!.*run\.js/,'')
  eval(code)
})