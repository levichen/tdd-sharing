'use strict'

const fs = require('fs')

const DATA_FILE_NAME = `${__dirname}/../data/data.csv`

// For Step14
const cassandraDriver = require('cassandra-driver')
const CASSANDRA_CONTACT_POINTS = [process.env.CASSANDRA_HOST || '127.0.0.1']
const CASSANDRA_KEY_SPACE = 'my_db'

class AccountModel {
  // For Step13
  constructor () {
    this.fs = null
    this.cassandraClient = null
  }

  // For Step13
  setFS (fs) {
    this.fs = fs || null

    return this
  }

  setCassandraClient (cassandraClient) {
    this.cassandraClient = cassandraClient || null

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

  getDataFromDatabase () {
    // reomve
    const cassandraClient = new cassandraDriver.Client({ contactPoints: CASSANDRA_CONTACT_POINTS, keyspace: CASSANDRA_KEY_SPACE })
    const query = 'SELECT * FROM person;'

    return new Promise((resolve, reject) => {
      this.cassandraClient.execute(query, [], {prepare: true})
        .then((data) => {
          let personData = data.rows
          /**
             * @type {{Id: number, Name: string, Age: number}[]}
             */
          let persons = []

          personData.map((person) => {
            persons.push({
              Id: person.person_id.toString(),
              Name: person.person_name,
              Age: person.person_age
            })
          })

          resolve(persons)

          this.cassandraClient.shutdown()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * @returns {Promise. <{ numberOfPeople: number, totalOfAge: number, avgAgeOfPeople: number }>}
   */
  getStatisticsFromDatabase () {
    let result = {
      numberOfPeople: 0,
      totalOfAge: 0,
      avgAgeOfPeople: 0
    }

    return new Promise((resolve, reject) => {
      this.getDataFromDatabase()
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
