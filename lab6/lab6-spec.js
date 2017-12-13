'use strict'

const chai = require('chai')
const sinon = require('sinon')
const Lab6 = require('./lab6')

const lab6 = new Lab6()

const expect = chai.expect

describe('Lab6: Stub Database', function () {
  this.timeout(5000)

  it('Expect exec method will return correct struct', function () {
    // arrange
    const NUMBER_OF_PEOPLE = 'numberOfPeople'
    const TOTAL_OF_AGE = 'totalOfAge'
    const AVG_AGE_OF_PEOPLE = 'avgAgeOfPeople'

    // act
    lab6.exec()
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

  it('Expect getDataFromFile method will return correct data', function (done) {
    const EXPECT_RESULT = [ { Id: 1, Number: 'Mike', Age: 30 },
      { Id: 2, Number: 'Levi', Age: 27 },
      { Id: 3, Number: 'Jo', Age: 19 },
      { Id: 4, Number: 'Peter', Age: 30 },
      { Id: 5, Number: 'Ben', Age: 44 } ]

    lab6.getDataFromFile()
      .then((persons) => {
        expect(persons).to.deep.equal(EXPECT_RESULT)
        done()
      })
      .catch((error) => {
        throw new Error(error)
      })
  })

  it('Expect exec method will return correct data', function (done) {
    const EXPECT_RESULT = {
      numberOfPeople: 5,
      totalOfAge: 150,
      avgAgeOfPeople: 30
    }

    lab6.exec()
      .then((persons) => {
        expect(persons).to.deep.equal(EXPECT_RESULT)
        done()
      })
      .catch((error) => {
        throw new Error(error)
      })
  })
})
