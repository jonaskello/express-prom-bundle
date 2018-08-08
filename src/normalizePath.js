'use strict';

const UrlValueParser = require('url-value-parser');
const url = require('url');

// ATTENTION! urlValueParser is a singleton!
let urlValueParser;

module.exports = function(req, opts) {
  // originalUrl is taken, because url and path can be changed
  // by middlewares such as 'router'. Note: this function is called onFinish
  /// i.e. always in the tail of the middleware chain
  const path = url.parse(req.originalUrl || req.url).pathname;

  if (!urlValueParser) {
    urlValueParser = new UrlValueParser(opts && opts.urlValueParser);
  }
  return urlValueParser.replacePathValues(path);
};
