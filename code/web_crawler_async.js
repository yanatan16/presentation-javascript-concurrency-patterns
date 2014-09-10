#!/usr/bin/env ./run.js

var async = require('async')
  , request = require('request')
  , cheerio = require('cheerio')
  , url = require('url')

var crawled = {}
  , total = 0
//START2 OMIT
var q = async.queue(crawlWeb, 3)
q.push('http://blog.joneisen.me/')

function crawlWeb(url, callback) {
  if (crawled[url]) return callback()
  var links = 0
  if (total++ > 20) throw new Error('ending early')

  console.log('crawling', url)
  request(url, function (err, resp, body) {
    if (!err && resp.statusCode === 200)
      cheerio.load(body)('a').each(function (i, el) {
        var link = linkify(el.attribs.href, url)
        if (link) { links ++
                    q.push(link) }
      })

    console.log('found ' + links + ' at ' + url)
    crawled[url] = true;
    callback()
  })
}
//END2 OMIT

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
