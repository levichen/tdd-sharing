'use strict'

class Lab5 {
  execSpy (fn) {
    fn()
    fn()
  }

  execSpy2 (fn) {
    fn(1, 2)
  }

  execStub (fn) {
    return fn()
  }

  execStubWithArgsReturns (fn) {
    fn(1)
    // throw new TypeError('Insert Message')
  }
}

module.exports = Lab5
