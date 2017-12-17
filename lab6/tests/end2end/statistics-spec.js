'use strict'

const chai = require('chai')
const request = require('supertest')

const app = require('../../app')
const server = request(app)

const expect = chai.expect

let statisticsClient = null

describe('End2End Test: API /v1/statistics', function () {
  beforeEach(() => {
    statisticsClient = server.get('/v1/statistics')
  })

  it('End2End 6-1: Expect Return HTTP 200 When Call /v1/statistics', function (done) {
    statisticsClient
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, RESULT) => {
        if (err) {
          console.log(err)
          done(err)
        } else {
          done()
        }
      })
  })

  it('End2End 6-2: Expect /v1/statistics will return correct data', function (done) {
    // Arrange
    const EXPECT_RESULT = {
      numberOfPeople: 4,
      totalOfAge: 120,
      avgAgeOfPeople: 30
    }

    statisticsClient
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, RESULT) => {
        if (err) {
          done(err)
        } else {
          // Assert
          expect(RESULT.body).to.deep.equal(EXPECT_RESULT)

          done()
        }
      })
  })
})
