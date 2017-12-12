/**
 * @param {string} mStr
 */
function reserveString (mStr) {
  let result = ''
  let mLen = mStr.length

  for (let i = mLen; i > -1; i = i - 1) {
    result += mStr.substring(i - 1, i)
  }
  return result
// return myString.split('').reverse().join('')
}

function reserverStringSpec1 () {
  // Arrange
  const TEST_STRING = 'abcdefg'
  const EXPECT_RESULT = 'gfedcba'

  // Act
  const TEST_RESULT = reserveString(TEST_STRING)

  // Assert
  console.log(`Reserver String Test Case: ${EXPECT_RESULT === TEST_RESULT}`)
}

function reserverStringSpec2 () {
  // Arrange
  const TEST_STRING = ''
  const EXPECT_RESULT = ''

  // Act
  const RESULT = reserveString(TEST_STRING)

  // Assert
  console.log(`Reserver String Test Case: ${EXPECT_RESULT === RESULT}`)
}

reserverStringSpec1()
reserverStringSpec2()
