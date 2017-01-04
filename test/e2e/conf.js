exports.config = {
  framework: 'jasmine',
  capabilities:{
    'browserName': 'chrome'
  },
  directConnect: true,
  specs: ['app.test.js'],
  onPrepare: function () {
    const path = require('path')
    const app = require('../../app/app')
    const http = require('http')
    const server = http.createServer(app)

    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
  }
}
