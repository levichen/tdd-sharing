'use strict'

const chai = require('chai')
const sinon = require('sinon')

const AccountModel = require('../../../models/accountModel')

const accountModel = new AccountModel()

const expect = chai.expect

describe('Lab6: Account API', function () {
  // for Step6
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

  // For Step10
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
})
