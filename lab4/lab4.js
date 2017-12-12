'use strict'

class Lab4 {
  exec () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('success')
      }, 10000)
    })
  }
}

module.exports = Lab4
