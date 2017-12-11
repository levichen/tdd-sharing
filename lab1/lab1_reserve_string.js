/**
 * @param {string} mStr
 */
function reserveString (mStr) {
  let result = ''
  var mLen = mStr.length

  for (let i = mLen; i > -1; i = i - 1) {
    result += mStr.substring(i - 1, i)
  }
  return result
// return myString.split('').reverse().join('')
}

function reserverStringSpec1 () {
  // Arrange
  const testString = 'abcdefg'
  const expectResult = 'gfedcba'

  // Act
  const result = reserveString(testString)

  // Assert
  console.log(`Reserver String Test Case: ${expectResult === result}`)
}

function reserverStringSpec2 () {
  // Arrange
  const testString = ''
  const expectResult = ''

  // Act
  const result = reserveString(testString)

  // Assert
  console.log(`Reserver String Test Case: ${expectResult === result}`)
}

reserverStringSpec1()
reserverStringSpec2()
