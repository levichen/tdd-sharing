'use strict'

const chai = require('chai')
const sinon = require('sinon')

// for Step13
const fs = require('fs')

const AccountModel = require('../../../models/accountModel')

// for Step13
let accountModel = null

// for Step14
const cassandraDriver = require('cassandra-driver')
const CASSANDRA_CONTACT_POINTS = [process.env.CASSANDRA_HOST || '127.0.0.1']
const CASSANDRA_KEY_SPACE = 'my_db'

const expect = chai.expect

describe('Account Model Unit Test', function () {
  // for Step13
  beforeEach(() => {
    accountModel = new AccountModel()
  })

  // for Step6
  it('Unit Test 6-1: Expect exec method will return correct struct', function (done) {
    // arrange
    const NUMBER_OF_PEOPLE = 'numberOfPeople'
    const TOTAL_OF_AGE = 'totalOfAge'
    const AVG_AGE_OF_PEOPLE = 'avgAgeOfPeople'

    // act
    accountModel
      .setFS(fs)
      .getStatistics()
      .then((RESULT) => {
        // assert
        expect(RESULT).to.have.property(NUMBER_OF_PEOPLE)
        expect(RESULT).to.have.property(TOTAL_OF_AGE)
        expect(RESULT).to.have.property(AVG_AGE_OF_PEOPLE)
        done()
      })
      .catch((error) => {
        done(error)
      })
  })

  // for Step8
  it('Unit Test 6-2: Expect getDataFromFile method will return correct data', function (done) {
    // Arrange
    const EXPECT_RESULT = [ { Id: '46568326-f158-4aa1-b1f5-d65840736cd3', Name: 'Levi', Age: 19 },
      { Id: '5139ba57-fa99-4df4-91fe-7ead588ff27a', Name: 'Marry', Age: 44 },
      { Id: '0efd11fd-6bc4-4f5f-b5ed-8baa23cad047', Name: 'Mike', Age: 27 },
      { Id: '44a3d909-0822-4af9-bfaa-f9589cc3be39', Name: 'Peter', Age: 30 } ]

    // Act
    accountModel
      .setFS(fs)
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

  // For Step10
  it('Unit Test 6-3: Expect getStatistics method will return correct data', function (done) {
    // Arrange
    const EXPECT_RESULT = {
      numberOfPeople: 4,
      totalOfAge: 120,
      avgAgeOfPeople: 30
    }

    // Act
    accountModel
      .setFS(fs)
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

  // for Step14
  it('Unit Test 6-2: Expect getDataFromDatabase method will return correct data', function (done) {
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

  // for Step15
  it('Expect database crash will return `DatabaseError`', function (done) {
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
  })

  // For Step16
  it('Unit Test 6-3: Expect getStatisticsFromDatabase method will return correct data', function (done) {
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
})
