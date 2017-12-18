const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')

// for Step13
const fs = require('fs')

const AccountModel = require('./models/accountModel')
const accountModel = new AccountModel()

// for Step18
const cassandraDriver = require('cassandra-driver')
const CASSANDRA_CONTACT_POINTS = [process.env.CASSANDRA_HOST || '127.0.0.1']
const CASSANDRA_KEY_SPACE = 'my_db'

const app = express()

app.use(compression())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/v1/statistics', (req, res, next) => {
  const cassandraClient = new cassandraDriver.Client({ contactPoints: CASSANDRA_CONTACT_POINTS, keyspace: CASSANDRA_KEY_SPACE })

  accountModel
    .setCassandraClient(cassandraClient)
    .getStatisticsFromDatabase()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      next(error)
    })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'testing') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 400)
    res.send({
      Err: err.message
    })
    req.log.error({ err: err })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 400)
  res.send({
    Err: 'There is error. Please contact the developer.'
  })
  req.log.error({ err: err })
})

module.exports = app
