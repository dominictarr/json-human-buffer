
var crypto = require('crypto')
var tape = require('tape')

var emptySha256 = crypto.createHash('sha256').digest()
var JSONH = require('./')

var expected = [
  'hello',
  new Buffer('hello', 'utf8'),
  emptySha256,
  {hash: emptySha256},
  require('./package.json'),
  {string: 'hello.base64'},
  {string: 'hello.base64...'}
]

tape('stringify/parse', function (t) {

  expected.forEach(function (obj) {
    var encoded = JSONH.stringify(obj)
    console.log('encoded:', encoded)
    t.deepEqual(obj, JSONH.parse(encoded))
  })

  t.end()

})
