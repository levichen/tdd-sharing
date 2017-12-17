## Step0. Install supertest
```$ npm install supertest --save-dev```

## Step1. Create Folders
- /tests
  - end2end
  - ut

## Step2. First Unit Test
/tests/end2end/account-spec.js

```
'use strict'

const chai = require('chai')
const sinon = require('sinon')

const expect = chai.expect

describe('End2End Test: API /v1/account', function () {
})
```

./node_modules/mocha/bin/_mocha --recursive lab6/tests/

## Step3. Add supertest, init accountClient, first ut
```
let accountClient = null

describe('End2End Test: API /v1/account', function () {
  beforeEach(() => {
    accountClient = server.get('/v1/account')
  })

  it('Expect Return HTTP 200 When Call /v1/account', function (done) {
    accountClient
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err
        }
        done()
      })
  })
})
```

## Step4. Create application structure
```
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')

const app = express()

app.use(compression())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/v1/account', (req, res) => {
  res.status(200).json({})
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
```