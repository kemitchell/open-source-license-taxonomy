var fs = require('fs')
var path = require('path')

module.exports = function (type) {
  var strings = []

  fs.readdirSync('licenses').forEach(function (file) {
    var data = require('./licenses/' + file)
    recurse(data)
  })

  strings.sort().forEach(function (string) {
    console.log(string)
  })

  function recurse (data) {
    if (Array.isArray(data[type])) {
      data[type].forEach(function (string) {
        if (!strings.includes(string)) strings.push(string)
      })
    }
    if (Array.isArray(data.content)) {
      data.content.forEach(function (element) {
        recurse(element)
      })
    }
  }
}
