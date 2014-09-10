setTimeout(callback, 1000)

require('fs').readFile(filename, printFile.bind(null, filename))

$.ajax({
  url: url,
  success: function () { /* ... */ }
})