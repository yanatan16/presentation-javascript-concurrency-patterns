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