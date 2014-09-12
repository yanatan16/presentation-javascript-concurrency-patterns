
var reactor = $('body')

// Click submit
$('form a.submit').on('click', function (e) { // HL
  e.preventDefault()
  reactor.trigger('ev-submit') // HL
  return false
})

// Dynamic on for 'a.cancel' which isn't in DOM yet
$('form').on('click', 'a.cancel', function (e) { // HL
  e.preventDefault()
  reactor.trigger('ev-cancel') // HL
  return false
})

reactor.on('ev-submit', function () { // HL
  console.log('submitting form!')
})
reactor.on('ev-cancel', function () { // HL
  console.log('cancelling form')
})
