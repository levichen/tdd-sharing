'use strict'

const chai = require('chai')
const request = require('supertest')

const app = require('../../app')
const server = request(app)

const expect = chai.expect

let accountClient = null

describe('End2End Test: API /v1/account', function () {
  beforeEach(() => {
    accountClient = server.get('/v1/account')
  })

  it('End2End 6-1: Expect Return HTTP 200 When Call /v1/account', function (done) {
    accountClient
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, RESULT) => {
        if (err) {
          done(err)
        }
        done()
      })
  })

  it('End2End 6-2: Expect /v1/account will return correct data', function (done) {
    // Arrange
    const EXPECT_RESULT = {
      numberOfPeople: 4,
      totalOfAge: 120,
      avgAgeOfPeople: 30
    }

    accountClient
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, RESULT) => {
        if (err) {
          done(err)
        }

        // Assert
        expect(RESULT.body).to.deep.equal(EXPECT_RESULT)

        done()
      })
  })
})
