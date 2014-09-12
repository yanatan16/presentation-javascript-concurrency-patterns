#!/usr/bin/env ./run.js

var request = require('request')
  , cheerio = require('cheerio')
  , url = require('url')

//START1 OMIT
function FiniteQueue(dowork, options) {  // HL
  var workers = 0, total = 0, queue = [], limit = options.concurrentLimit

  return {
    push: function (item) { // HL
      if (workers < limit)
        start(item)
      else
        queue.push(item)
    }
  }

  function start(item) { // HL
    workers ++; var worker_num = total++ % limit;
    setImmediate(dowork.bind(null, item, worker_num, function (err) { // HL
      workers --
      if (queue.length) start(queue.shift())
    }))
  }
}
//END1 OMIT

var crawled_list = {}

//START2 OMIT
var queue = FiniteQueue(crawlWeb, { concurrentLimit: 3 }) // HL
queue.push('http://blog.joneisen.me/')

function crawlWeb(url, worker_num, callback) { // HL
  if (crawled(url)) return callback()
  var links = 0

  console.log(worker_num + ' crawling', url)
  request(url, function (err, resp, body) { // HL
    if (!err && resp.statusCode === 200)
      cheerio.load(body)('a').each(function (i, el) { // HL
        var link = linkify(el.attribs.href, url)
        if (link) { links ++
                    queue.push(link) }
      })

    console.log(worker_num + ' found ' + links + ' at ' + url)
    callback() // HL
  })
}
//END2 OMIT

function crawled(s) {
  s = s.split('?')[0].replace(/^https/, 'http')
  if (crawled_list[s])
    return true
  crawled_list[s] = true
  return false
}

function linkify(link, baseurl) {
  if (!link || !baseurl) return
  if (/mail/.test(link)) return

  var lurl = url.parse(link)
    , burl = url.parse(baseurl)

  return (lurl.protocol || burl.protocol) +
         '//' +
         (lurl.hostname || burl.hostname) +
         lurl.path
}
