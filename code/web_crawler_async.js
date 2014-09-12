#!/usr/bin/env ./run.js

var async = require('async')
  , request = require('request')
  , cheerio = require('cheerio')
  , url = require('url')

var crawled_list = {}

//START2 OMIT
var queue = async.queue(crawlWeb, 3) // HL
queue.push('http://blog.joneisen.me/')

function crawlWeb(url, callback) { // HL
  if (crawled(url)) return callback()
  var links = 0

  console.log('crawling', url)
  request(url, function (err, resp, body) { // HL
    if (!err && resp.statusCode === 200)
      cheerio.load(body)('a').each(function (i, el) { // HL
        var link = linkify(el.attribs.href, url)
        if (link) { links ++
                    queue.push(link) }
      })

    console.log('found ' + links + ' at ' + url)
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
