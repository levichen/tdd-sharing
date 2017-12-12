'use strict'

const chai = require('chai')
const sinon = require('sinon')
const Lab5 = require('./lab5')

const lab5 = new Lab5()

const expect = chai.expect

describe('Lab5: Understand sinon.js', function () {
  it('Test Sinon.js spy calledOnce, callCount, called', function () {
    // arrange
    const MY_SPY = sinon.spy()
    const EXPECT_CALL_ONCE = true
    const EXPECT_CALL_TIMES = 1
    const EXPECT_CALLED = true

    // act
    lab5.execSpy(MY_SPY)

    // assert
    expect(MY_SPY.calledOnce).to.equal(EXPECT_CALL_ONCE)
    expect(MY_SPY.callCount).to.equal(EXPECT_CALL_TIMES)
    expect(MY_SPY.called).to.equal(EXPECT_CALLED)
  })

  it('Test Sinon.js spy calledWith', function () {
    const MY_SPY = sinon.spy()
    const EXPECT_CALL_WITH_1_AND_2 = true

    lab5.execSpy2(MY_SPY)
    expect(MY_SPY.calledWith(1, 2)).to.be.equal(EXPECT_CALL_WITH_1_AND_2)
  })

  it('Test Sinon.js stub returns', function () {
    const MY_STUB = sinon.stub().returns(100)
    const EXPECT_RESULT = 100

    const RESULT = lab5.execStub(MY_STUB)

    expect(RESULT).to.be.equal(EXPECT_RESULT)
  })

  it('Test Sinon.js stub withArgs and returns value', function () {
    const MY_STUB = sinon.stub()
    const EXPECTED_RESULT = 200

    MY_STUB.withArgs(100).returns(200)
    MY_STUB.withArgs(200).returns(400)

    const RESULT = lab5.execStubWithArgsReturnsValue(MY_STUB)

    expect(RESULT).to.be.equal(EXPECTED_RESULT)
  })

  it('Test Sinon.js stub withArgs and returns', function () {
    const MY_STUB = sinon.stub()

    MY_STUB.withArgs(100).returns(200)
    MY_STUB.withArgs(200).returns(400)
    MY_STUB.withArgs(1).throws(new TypeError('Insert Message'))

    expect(function () {
      lab5.execStubWithArgsReturnsError(MY_STUB)
    }).to.throw('Insert Message')
  })

  it('Test Sinon.js stub return Promise Reolsve', function () {
    const MY_STUB = sinon.stub()
    MY_STUB.withArgs(1).resolves(123)

    const EXPECT_RESULT = 123

    lab5.execStubWithReturnPromiseResolve(MY_STUB)
      .then((data) => {
        expect(data).to.be.equal(EXPECT_RESULT)
      })
  })

  it('Test Sinon.js stub return Promise Reject', function () {
    const MY_STUB = sinon.stub()
    MY_STUB.withArgs(1).rejects(456)

    const EXPECT_RESULT = 456

    lab5.execStubWithReturnPromiseResolve(MY_STUB)
      .then((data) => {
        throw new Error(data)
      })
      .catch((error) => {
        expect(error).to.be.equal(EXPECT_RESULT)
      })
  })
})
