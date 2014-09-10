
var reactor = $('body')

// Click submit
$('form a.submit').on('click', function (e) {
  e.preventDefault()
  reactor.trigger('ev-submit')
  return false
})

// Dynamic on for 'a.cancel' which isn't in DOM yet
$('form').on('click', 'a.cancel', function (e) {
  e.preventDefault()
  reactor.trigger('ev-cancel')
  return false
})

reactor.on('ev-submit', function () {
  console.log('submitting form!')
})
reactor.on('ev-cancel', function () {
  console.log('cancelling form')
})
