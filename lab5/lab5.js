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

  execStubWithReturnPromiseResolve (fn) {
    return fn(1)
  }

  execStubWithReturnPromiseReject (fn) {
    return fn(1)
  }
}

module.exports = Lab5
