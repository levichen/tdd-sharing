'use strict'

const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')

const app = require('../../app')
const server = request(app)

const expect = chai.expect

let accountClient = null

describe('End2End Test: API /v1/account', function () {
  beforeEach(() => {
    accountClient = server.get('/v1/account')
  })

  it('Expect Return HTTP 200 When Call /v1/account', function (done) {
    accountClient
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err
        }
        done()
      })
  })
})
