const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const flash = require('connect-flash');
var session = require('express-session')

if (process.env.NODE_ENV !== 'test') {
  const logger = require('morgan')
  app.use(logger('dev'))
}

const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(flash());
app.use(session({ secret: 'keyboard cat' }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))

app.use('/posts', require('./routes/posts'))
app.use('/posts', require('./routes/comments'))
// app.use('/users', require('./routes/users'))
// app.use('/token', require('./routes/token'))

app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log(err)
  res.status(err.status || 500)
  res.json(err)
})

module.exports = app
