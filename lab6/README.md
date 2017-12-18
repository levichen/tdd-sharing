## Step0. Install supertest
```$ npm install supertest --save-dev```

## Step1. Create Folders
- /tests
  - end2end
  - ut

## Step2. First Unit Test
/tests/end2end/statistics-spec.js

```
'use strict'

const chai = require('chai')
const sinon = require('sinon')

const expect = chai.expect

describe('End2End Test: API /v1/statistics', function () {
})
```

./node_modules/mocha/bin/_mocha --recursive lab6/tests/

## Step3. Add supertest, init statisticsClient, first ut
```
let statisticsClient = null

describe('End2End Test: API /v1/statistics', function () {
  beforeEach(() => {
    statisticsClient = server.get('/v1/statistics')
  })

  it('End2End 6-1: Expect Return HTTP 200 When Call /v1/statistics', function (done) {
    statisticsClient
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, RESULT) => {
        if (err) {
          done(err)
        } else {
          done()
        }
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

app.get('/v1/statistics', (req, res) => {
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

const AccountModel = require('../../../models/accountModel')

const accountModel = new AccountModel()

const expect = chai.expect

describe('Account Model Unit Test', function () {
  // for step1
  it('Unit Test 6-1: Expect exec method will return correct struct', function (done) {
    // Arrange
    const NUMBER_OF_PEOPLE = 'numberOfPeople'
    const TOTAL_OF_AGE = 'totalOfAge'
    const AVG_AGE_OF_PEOPLE = 'avgAgeOfPeople'

    // Act
    accountModel
      .getStatistics()
      .then((RESULT) => {
        // Assert
        expect(RESULT).to.have.property(NUMBER_OF_PEOPLE)
        expect(RESULT).to.have.property(TOTAL_OF_AGE)
        expect(RESULT).to.have.property(AVG_AGE_OF_PEOPLE)
        done()
      })
      .catch((error) => {
        done(error)
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
it('Unit Test 6-2: Expect getDataFromFile method will return correct data', function (done) {
  // Arrange
  const EXPECT_RESULT = [ { Id: '46568326-f158-4aa1-b1f5-d65840736cd3', Name: 'Levi', Age: 19 },
    { Id: '5139ba57-fa99-4df4-91fe-7ead588ff27a', Name: 'Marry', Age: 44 },
    { Id: '0efd11fd-6bc4-4f5f-b5ed-8baa23cad047', Name: 'Mike', Age: 27 },
    { Id: '44a3d909-0822-4af9-bfaa-f9589cc3be39', Name: 'Peter', Age: 30 } ]

  // Act
  accountModel
    .getDataFromFile()
    .then((RESULT) => {
      // Assert
      expect(RESULT).to.deep.equal(EXPECT_RESULT)
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
it('Unit Test 6-3: Expect getStatistics method will return correct data', function (done) {
  // Arrange
  const EXPECT_RESULT = {
    numberOfPeople: 4,
    totalOfAge: 120,
    avgAgeOfPeople: 30
  }

  // Act
  accountModel
    .getStatistics()
    .then((RESULT) => {
      // Assert
      expect(RESULT).to.deep.equal(EXPECT_RESULT)
      done()
    })
    .catch((error) => {
      done(error)
    })
})
```
## Step11. Expect /v1/statistics method will return correct data on end2end/accountModel-spec.js
```
  it('End2End 6-2: Expect /v1/statistics will return correct data', function (done) {
    // Arrange
    const EXPECT_RESULT = {
      numberOfPeople: 4,
      totalOfAge: 120,
      avgAgeOfPeople: 30
    }

    statisticsClient
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, RESULT) => {
        if (err) {
          done(err)
        } else {
          // Assert
          expect(RESULT.body).to.deep.equal(EXPECT_RESULT)

          done()
        }
      })
  })
```

## Step12. Add Production code for step11
```
## app.js

const AccountModel = require('./models/accountModel')
const accountModel = new AccountModel()

app.get('/v1/statistics', (req, res, next) => {
  accountModel
    .getStatistics()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      next(error)
    })
})
```

## Step13. Refactoring model/accountModel
1. Create setFs method
2. Create constructure for accountModel to set default value for fs
3. Rename all of function which use fs at model/accountMode.js
4. Call Test Codea -> Unit Test Code OK
5. Add setFs on /v1/statitics API

```
## Step13-1, 2
  // For Step13
  constructor () {
    this.fs = null
  }

  // For Step13
  setFS (fs) {
    this.fs = fs || null

    return this
  }

## Step13-3
const data = this.fs.readFileSync(DATA_FILE_NAME, 'utf8')

Rerun all of test cases.
所以工程師的通病，假會

## Step13-4
// for Step13
const fs = require('fs')

accountModel
  .setFS(fs)

// for Step13
let accountModel = null

describe('Account Model Unit Test', function () {
  // for Step13
  beforeEach(() => {
    accountModel = new AccountModel()
  })
})

## Step13-5
app.get('/v1/statistics', (req, res, next) => {
  accountModel
    .setFS(fs)
    .getStatistics()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      next(error)
    })
})
```

## Step14. Read data from Database
1. Create Table and inert data
  * Run Docker
  * exec data/create.sql
2. Create getDataFromDatabase Test Case at accountModel-spec.js
The test content same as getDataFromFile
```
  it('Unit Test 6-4: Expect getDataFromDatabase method will return correct data', function (done) {
    // Arrange
    const EXPECT_RESULT = [ { Id: '46568326-f158-4aa1-b1f5-d65840736cd3', Name: 'Levi', Age: 19 },
      { Id: '5139ba57-fa99-4df4-91fe-7ead588ff27a', Name: 'Marry', Age: 44 },
      { Id: '0efd11fd-6bc4-4f5f-b5ed-8baa23cad047', Name: 'Mike', Age: 27 },
      { Id: '44a3d909-0822-4af9-bfaa-f9589cc3be39', Name: 'Peter', Age: 30 } ]

    // Act
    accountModel
      .getDataFromDatabase()
      .then((RESULT) => {
        // Assert
        expect(RESULT).to.deep.equal(EXPECT_RESULT)
        done()
      })
      .catch((error) => {
        done(error)
      })
  })
```

3. Run Test Case, get a red light
4. Add getDataFromDatabase metohd
```
  getDataFromDatabase () {
    const cassandraClient = new cassandraDriver.Client({ contactPoints: CASSANDRA_CONTACT_POINTS, keyspace: CASSANDRA_KEY_SPACE })
    const query = 'SELECT * FROM person;'

    return new Promise((resolve, reject) => {
      cassandraClient.execute(query, [], {prepare: true})
        .then((data) => {
          let personData = data.rows
          /**
             * @type {{Id: number, Name: string, Age: number}[]}
             */
          let persons = []

          personData.map((person) => {
            persons.push({
              Id: person.person_id.toString(),
              Name: person.person_name,
              Age: person.person_age
            })
          })

          resolve(persons)

          cassandraClient.shutdown()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
```
5. Run Test Case again


## Step15. DI Cassandra Client
1. Constructure, and setCassandraClient()
  constructor () {
    this.fs = null
    this.cassandraClient = null
  }

  setCassandraClient (cassandraClient) {
    this.cassandraClient = cassandraClient || null

    return this
  }


2. getData FromDatabase method
getDataFromDatabase () {
    // reomve
    // const cassandraClient = new cassandraDriver.Client({ contactPoints: CASSANDRA_CONTACT_POINTS, keyspace: CASSANDRA_KEY_SPACE })
    const query = 'SELECT * FROM person;'

    return new Promise((resolve, reject) => {
      this.cassandraClient.execute(query, [], {prepare: true})
        .then((data) => {
          let personData = data.rows
          /**
             * @type {{Id: number, Name: string, Age: number}[]}
             */
          let persons = []

          personData.map((person) => {
            persons.push({
              Id: person.person_id.toString(),
              Name: person.person_name,
              Age: person.person_age
            })
          })

          resolve(persons)

          this.cassandraClient.shutdown()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

3. Get red light

4. Modify Test Case
```
const cassandraDriver = require('cassandra-driver')
const CASSANDRA_CONTACT_POINTS = [process.env.CASSANDRA_HOST || '127.0.0.1']
const CASSANDRA_KEY_SPACE = 'my_db'

  // for Step14
  it('Unit Test 6-4: Expect getDataFromDatabase method will return correct data', function (done) {
    // Add
    const cassandraClient = new cassandraDriver.Client({ contactPoints: CASSANDRA_CONTACT_POINTS, keyspace: CASSANDRA_KEY_SPACE })

    // Arrange
    const EXPECT_RESULT = [ { Id: '46568326-f158-4aa1-b1f5-d65840736cd3', Name: 'Levi', Age: 19 },
      { Id: '5139ba57-fa99-4df4-91fe-7ead588ff27a', Name: 'Marry', Age: 44 },
      { Id: '0efd11fd-6bc4-4f5f-b5ed-8baa23cad047', Name: 'Mike', Age: 27 },
      { Id: '44a3d909-0822-4af9-bfaa-f9589cc3be39', Name: 'Peter', Age: 30 } ]

    // Act
    accountModel
      // Add
      .setCassandraClient(cassandraClient)
      .getDataFromDatabase()
      .then((RESULT) => {
        // Assert
        expect(RESULT).to.deep.equal(EXPECT_RESULT)
        done()
      })
      .catch((error) => {
        done(error)
      })
  })
```

## Step16. Stub Cassandra Client
```
  it('Unit Test 6-5: Expect database crash will return `DatabaseError`', function (done) {
    const cassandraClient = new cassandraDriver.Client({ contactPoints: CASSANDRA_CONTACT_POINTS, keyspace: CASSANDRA_KEY_SPACE })

    const fakeError = new Error('DatabaseError')
    sinon.stub(cassandraClient, 'execute').throws(fakeError)

    accountModel
      .setCassandraClient(cassandraClient)
      .getDataFromDatabase()
      .then((THIS_IS_ERROR) => {
        done(THIS_IS_ERROR)
      })
      .catch((error) => {
        expect(error.message).to.be.equal('DatabaseError')
        done()
      })
  }):507
```

## Step17. Test Database return Promise.reject
```
## accountModel-spec.js
  it('Unit Test 6-6: Expect database return Promise.reject the getDataFromDatabase() will return []', function (done) {
    const cassandraClient = new cassandraDriver.Client({ contactPoints: CASSANDRA_CONTACT_POINTS, keyspace: CASSANDRA_KEY_SPACE })

    sinon.stub(cassandraClient, 'execute').rejects('something wrong')

    accountModel
      .setCassandraClient(cassandraClient)
      .getDataFromDatabase()
      .then((THIS_IS_ERROR) => {
        done(THIS_IS_ERROR)
      })
      .catch((RESULT) => {
        expect(RESULT).to.be.deep.equal([])
        done()
      })
  })

## accountModel.js
  getDataFromDatabase () {
    // reomve
    const query = 'SELECT * FROM person;'

    return new Promise((resolve, reject) => {
      // move this
      /**
      * @type {{Id: number, Name: string, Age: number}[]}
      */
      let persons = []

      this.cassandraClient.execute(query, [], {prepare: true})
        .then((data) => {
          let personData = data.rows

          personData.map((person) => {
            persons.push({
              Id: person.person_id.toString(),
              Name: person.person_name,
              Age: person.person_age
            })
          })

          resolve(persons)

          this.cassandraClient.shutdown()
        })
        .catch((error) => {
          // add this
          reject(persons)
        })
    })
  }
```

## Step18. Add getStatisticsFromDatabase method() on accountModel.js
```
## accountModel-spec.js
  // For Step18
  it('Unit Test 6-7: Expect getStatisticsFromDatabase method will return correct data', function (done) {
    const cassandraClient = new cassandraDriver.Client({ contactPoints: CASSANDRA_CONTACT_POINTS, keyspace: CASSANDRA_KEY_SPACE })

    // Arrange
    const EXPECT_RESULT = {
      numberOfPeople: 4,
      totalOfAge: 120,
      avgAgeOfPeople: 30
    }

    // Act
    accountModel
      .setCassandraClient(cassandraClient)
      .getStatisticsFromDatabase()
      .then((RESULT) => {
        // Assert
        expect(RESULT).to.deep.equal(EXPECT_RESULT)
        done()
      })
      .catch((error) => {
        done(error)
      })
  })

## accountModel.js
  /**
   * @returns {Promise. <{ numberOfPeople: number, totalOfAge: number, avgAgeOfPeople: number }>}
   */
  getStatisticsFromDatabase () {
    let result = {
      numberOfPeople: 0,
      totalOfAge: 0,
      avgAgeOfPeople: 0
    }

    return new Promise((resolve, reject) => {
      this.getDataFromDatabase()
        .then((persons) => {
          persons.map((person) => {
            result.numberOfPeople += 1
            result.totalOfAge += person.Age
          })

          result.avgAgeOfPeople = result.totalOfAge / result.numberOfPeople

          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
```

## Step19. Change app.js
// for Step19
```
const cassandraDriver = require('cassandra-driver')
const CASSANDRA_CONTACT_POINTS = [process.env.CASSANDRA_HOST || '127.0.0.1']
const CASSANDRA_KEY_SPACE = 'my_db'

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
```