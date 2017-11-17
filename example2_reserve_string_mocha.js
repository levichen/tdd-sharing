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
    const testString = 'abcdefg'
    const expectResult = 'gfedcba'

    // Act
    const result = reserveString(testString)

    // Assert
    expect(expectResult).to.be.equal(result)
  })
})
