'use strict'

const readline = require('readline')
const fs = require('fs')

const DATA_FILE_NAME = `${__dirname}/data.csv`

class Lab6 {

  /**
   * @returns {Promise. <{Id: number, Name: string, Age: number}[]>}
   */
  getDataFromFile () {
    return new Promise((resolve, reject) => {
      /**
       * @type {{Id: number, Name: string, Age: number}[]}
       */
      let persons = []

      const rl = readline.createInterface({
        input: fs.createReadStream(DATA_FILE_NAME)
      })

      rl.on('line', (line) => {
        let person = line.split(',')
        persons.push({
          Id: parseInt(person[0]),
          Number: person[1],
          Age: parseInt(person[2])
        })
      }).on('close', () => {
        resolve(persons)
      })
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
