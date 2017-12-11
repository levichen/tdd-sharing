const chai = require('chai')

const expect = chai.expect

/**
 * @param {string} mStr
 */
function reserveString (mStr) {
  return mStr.split('').reverse().join('')
}

describe('Reserve String Test Cases', function () {
  it('Expect get gfedcba when input abcdefg', function () {
    // Arrange
    const TEST_STRING = 'abcdefg'
    const EXPECT_RESULT = 'gfedcba'

    // Act
    const RESULT = reserveString(TEST_STRING)

    // Assert
    expect(EXPECT_RESULT).to.be.equal(RESULT)
  })
})
