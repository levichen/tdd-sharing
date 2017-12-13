/**
 * Step1. Check exec data struct
 * Step2. Check Read File Content
 * Step4. Check numberOfPeople, totalOfAge, avgAgeOfPeople logic
 * Step5. Refactoring DI, constructor
 * Step6. Mocha beforeEach
 * Step7. Refactoring DI, setFs method
 */
'use strict'

const fs = require('fs')

const DATA_FILE_NAME = `${__dirname}/data.csv`

class Lab6 {
  constructor (fs) {
    this.fs = null
    this.setFS(fs)
  }

  setFS (fs) {
    if (fs !== null) {
      this.fs = fs
    }

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

      fs.readFile(DATA_FILE_NAME, 'utf8')

      const data = this.fs.readFileSync(DATA_FILE_NAME, 'utf8')
      const dataByLine = data.split('\n')

      dataByLine.map((line) => {
        let person = line.split(',')
        persons.push({
          Id: parseInt(person[0]),
          Number: person[1],
          Age: parseInt(person[2])
        })
      })

      resolve(persons)
    })
  }

  exec () {
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

module.exports = Lab6
