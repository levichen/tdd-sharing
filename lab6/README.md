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

## Step5. Create models folder then create accountModel.js
```
## accountModel.js 
'use strict'

class AccountModel {
  /**
   * @returns {Promise. <{ numberOfPeople: number, totalOfAge: number, avgAgeOfPeople: number }>}
   */
  getStatistics () {}
}

module.exports = AccountModel
```

## Step6. Create ut/model/accountModel-spec.js file
```
'use strict'

const chai = require('chai')
const sinon = require('sinon')

const AccountModel = require('../../../models/accountModel')

const accountModel = new AccountModel()

const expect = chai.expect

describe('Lab6: Account API', function () {
  // for step1
  it('Test 6-1: Expect exec method will return correct struct', function () {
    // arrange
    const NUMBER_OF_PEOPLE = 'numberOfPeople'
    const TOTAL_OF_AGE = 'totalOfAge'
    const AVG_AGE_OF_PEOPLE = 'avgAgeOfPeople'

    // act
    accountModel
      .getStatistics()
      .then((RESULT) => {
        // assert
        expect(RESULT).to.have.property(NUMBER_OF_PEOPLE)
        expect(RESULT).to.have.property(TOTAL_OF_AGE)
        expect(RESULT).to.have.property(AVG_AGE_OF_PEOPLE)
      })
      .catch((error) => {
        throw new Error(error)
      })
  })
})
```

## Step7. Add response struct on model/accountModel.js getStatistics()
```
/**
  * @returns {Promise. <{ numberOfPeople: number, totalOfAge: number, avgAgeOfPeople: number }>}
  */
getStatistics () {
  let result = {
    numberOfPeople: 0,
    totalOfAge: 0,
    avgAgeOfPeople: 0
  }

  return new Promise((resolve, reject) => {
    resolve(result)
  })
}
```

## Step8. Give them data/data.csv then Add UT
```
// for Step8
it('Test 6-2: Expect getDataFromFile method will return correct data', function (done) {
  // Arrange
  const EXPECT_RESULT = [ { Id: '46568326-f158-4aa1-b1f5-d65840736cd3', Name: 'Levi', Age: 19 },
    { Id: '5139ba57-fa99-4df4-91fe-7ead588ff27a', Name: 'Marry', Age: 44 },
    { Id: '0efd11fd-6bc4-4f5f-b5ed-8baa23cad047', Name: 'Mike', Age: 27 },
    { Id: '44a3d909-0822-4af9-bfaa-f9589cc3be39', Name: 'Peter', Age: 30 } ]

  // Act
  accountModel
    .getDataFromFile()
    .then((persons) => {
      // Assert
      expect(persons).to.deep.equal(EXPECT_RESULT)
      done()
    })
    .catch((error) => {
      done(error)
    })
})
```

## Step9. Add getDataFromFile on model/accountModel.js
```
const fs = require('fs')

const DATA_FILE_NAME = `${__dirname}/../../data/data.csv`

/**
  * @returns {Promise. <{Id: number, Name: string, Age: number}[]>}
  */
getDataFromFile () {
  return new Promise((resolve, reject) => {
    /**
      * @type {{Id: number, Name: string, Age: number}[]}
      */
    let persons = []

    const data = fs.readFileSync(DATA_FILE_NAME, 'utf8')
    const dataByLine = data.split('\n')

    dataByLine.map((line) => {
      let person = line.split(',')
      persons.push({
        Id: person[0],
        Name: person[1],
        Age: parseInt(person[2])
      })
    })

    resolve(persons)
  })
}
```


## Step10. Expect getStatistics method will return correct data
```
it('Test 6-3: Expect getStatistics method will return correct data', function (done) {
  // Arrange
  const EXPECT_RESULT = {
    numberOfPeople: 4,
    totalOfAge: 120,
    avgAgeOfPeople: 30
  }

  // Act
  accountModel
    .getStatistics()
    .then((persons) => {
      // Assert
      expect(persons).to.deep.equal(EXPECT_RESULT)
      done()
    })
    .catch((error) => {
      done(error)
    })
})
```