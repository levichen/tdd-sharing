'use strict'

class ReserveString {
  /**
   * @param {string} mStr
   */
  exec (mStr) {
    return mStr.split('').reverse().join('')
  }
}

module.exports = ReserveString
