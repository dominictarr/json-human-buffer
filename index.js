function isObject (o) {
  return o && 'object' === typeof o && !Buffer.isBuffer(o)
}

function clone (obj, map) {
  obj = map(obj)
  if(!isObject(obj)) return obj
  var a = Array.isArray(obj) ? [] : {}

  for(var key in obj) {
    if(Object.hasOwnProperty.call(obj, key)) {
      var value = map(obj[key])
      a[key] = isObject(value) ? clone(value, map) : value
    }
  }

  return a
}

function isEncoded (s) {
  return 'string' === typeof s && /\.(base64)?$/.test(s)
}

function toHuman (obj) {
  return clone(obj, function (obj) {
    return Buffer.isBuffer(obj) ? obj.toString('base64') + '.base64'
      : isEncoded(obj)          ? obj + '.'
      :                           obj
  })
}

function fromHuman(obj) {
  return clone(obj, function (obj) {
    if(!isEncoded(obj)) return obj
    if(obj[obj.length - 1] === '.')
      return obj.substring(0, obj.length - 1)
    else
      return new Buffer(obj.substring(0, obj.length - 7), 'base64')
  })
}

exports.stringify = function (obj, _, indent) {
  return JSON.stringify(toHuman(obj), _, indent)
}

exports.parse = function (string, _) {
  return fromHuman(JSON.parse(string, _))
}

exports.fromHuman = fromHuman
exports.toHuman = toHuman
