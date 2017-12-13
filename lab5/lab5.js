'use strict'

class Lab5 {
  execSpyCalledOnceCallCountCalled (fn) {
    fn()
  }

  execSpyCalledWith (fn) {
    fn(1, 2)
  }

  execStubReturns (fn) {
    return fn()
  }

  execStubWithArgsReturnsValue (fn) {
    return fn(100)
  }

  execStubWithArgsReturnsError (fn) {
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
