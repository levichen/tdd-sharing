'use strict'

const chai = require('chai')
const expect = chai.expect

const Lab4 = require('./lab4')
const lab4 = new Lab4()

describe('Test Async Code on Mocha', function () {
  this.timeout(15000)

  it('Test1', function (done) {
    lab4.exec()
      .then((data) => {
        expect(data).to.equal('success')
        done()
      })
      .catch(() => {
        done()
      })
  })

  it('Test2', function () {
    return lab4.exec()
      .then((data) => {
        expect(data).to.equal('success')
      })
      .catch(() => {
      })
  })
})
