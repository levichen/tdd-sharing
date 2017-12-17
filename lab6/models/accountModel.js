'use strict'

const fs = require('fs')

const DATA_FILE_NAME = `${__dirname}/../data/data.csv`

class AccountModel {
  // For Step13
  constructor () {
    this.fs = null
  }

  // For Step13
  setFS (fs) {
    this.fs = fs || null

    return this
  }
  /**
  * @returns {Promise. <{Id: number, Name: string, Age: number}[]>}
  */
  getDataFromFile () {
    return new Promise((resolve, reject) => {
      /**
        * @type {{Id: number, Name: string, Age: number}[]}
        */
      let persons = []

      // for Step9
      // const data = this.fs.readFileSync(DATA_FILE_NAME, 'utf8')

      // for Step13
      const data = this.fs.readFileSync(DATA_FILE_NAME, 'utf8')
      const dataByLine = data.split('\n')

      dataByLine.map((line) => {
        let person = line.split(',')
        persons.push({
          Id: person[0],
          Name: person[1],
          Age: parseInt(person[2])
        })
      })

      resolve(persons)
    })
  }
  /**
   * @returns {Promise. <{ numberOfPeople: number, totalOfAge: number, avgAgeOfPeople: number }>}
   */
  getStatistics () {
    let result = {
      numberOfPeople: 0,
      totalOfAge: 0,
      avgAgeOfPeople: 0
    }

    return new Promise((resolve, reject) => {
      this.getDataFromFile()
        .then((persons) => {
          persons.map((person) => {
            result.numberOfPeople += 1
            result.totalOfAge += person.Age
          })

          result.avgAgeOfPeople = result.totalOfAge / result.numberOfPeople

          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

module.exports = AccountModel
