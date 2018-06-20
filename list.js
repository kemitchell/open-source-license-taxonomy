var fs = require('fs')
var path = require('path')

module.exports = function (type) {
  var strings = {}

  fs.readdirSync('licenses').forEach(function (file) {
    var data = require('./licenses/' + file)
    var basename = path.basename(file, '.json')
    recurse(basename, data)
  })

  Object.keys(strings)
    .sort()
    .forEach(function (string) {
      console.log(string + ' (' + strings[string].sort().join(', ') + ')')
    })

  function recurse (basename, data) {
    if (Array.isArray(data[type])) {
      data[type].forEach(function (string) {
        if (!strings.hasOwnProperty(string)) {
          strings[string] = [basename]
        } else if (!strings[string].includes(basename)) {
          strings[string].push(basename)
        }
      })
    }
    if (Array.isArray(data.content)) {
      data.content.forEach(function (element) {
        recurse(basename, element)
      })
    }
  }
}
