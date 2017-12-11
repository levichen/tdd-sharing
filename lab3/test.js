const chai = require('chai')
const expect = chai.expect

let ReserveString = require('./reserve_string')

let target

describe('Reserve String Test Cases', function () {
  beforeEach(() => {
    target = new ReserveString()
  })

  it('Expect get gfedcba when input abcdefg', function () {
    // Arrange
    const TEST_STRING = 'abcdefg'
    const EXPECT_RESULT = 'gfedcba'

    // Act
    const RESULT = target.exec(TEST_STRING)

    // Assert
    expect(EXPECT_RESULT).to.be.equal(RESULT)
  })
})
