'use strict'

const chai = require('chai')
const sinon = require('sinon')
const Lab5 = require('./lab5')

const lab5 = new Lab5()

const expect = chai.expect

describe('Lab5: Understand sinon.js', function () {
  it('Test Sinon.js spy', function () {
    // arrange
    const MY_SPY = sinon.spy()
    const EXPECT_CALL_ONCE = true

    // act
    lab5.execSpy(MY_SPY)

    // assert
    // expect(MY_SPY.calledOnce).to.equal(EXPECT_CALL_ONCE)
    console.log(MY_SPY.calledOnce)
    console.log(MY_SPY.callCount)
    console.log(MY_SPY.called)
  })

  it('Test Sinon.js spy2', function () {
    const MY_SPY = sinon.spy()

    lab5.execSpy2(MY_SPY)
    console.log(MY_SPY.calledWith(1, 2))
  })

  it('Test Sinon.js stub returns', function () {
    const MY_STUB = sinon.stub().returns(100)

    const RESULT = lab5.execStub(MY_STUB)

    console.log(RESULT)
  })

  it('Test Sinon.js stub withArgs and returns', function () {
    const MY_STUB = sinon.stub()
    MY_STUB.withArgs(100).returns(200)
    MY_STUB.withArgs(200).returns(400)
    MY_STUB.withArgs(1).throws(new TypeError('Insert Message'))

  // const RESULT = lab5.execStubWithArgsReturns(MY_STUB)
  // expect(lab5.execStubWithArgsReturns(MY_STUB)).to.throw()
  })

  it('Test Sinon.js stub return Promise Reolsve', function () {
    const MY_STUB = sinon.stub()
    MY_STUB.withArgs(1).resolves(123)

    lab5.execStubWithReturnPromiseResolve(MY_STUB)
      .then((data) => {
        console.log(data)
      })
  })

  it('Test Sinon.js stub return Promise Reject', function () {
    const MY_STUB = sinon.stub()
    MY_STUB.withArgs(1).rejects(456)

    lab5.execStubWithReturnPromiseResolve(MY_STUB)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(`this is error ${error}`)
      })
  })
})
