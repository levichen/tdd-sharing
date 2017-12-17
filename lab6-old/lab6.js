/**
 * Step1. Check exec data struct
 *  test case first
 *  exec method return {
      numberOfPeople: 0,
      totalOfAge: 0,
      avgAgeOfPeople: 0
    }
 *
 * Step2. Check Read File Content
 *  getDataFromFile method  
 * Step4. Check numberOfPeople, totalOfAge, avgAgeOfPeople logic
 *  exec method
 * Step5. Refactoring DI, setFs method
 *  constructor this.fs
 *  setFs method
 *  test case call setFs
 * Step6. Mocha beforeEach
 * Step7. Read from database: add getDataFromDataBase method, getDataFromDataBase test case, the content same as getDataFromDataBase
 * Step8. DI Cassandra Client
 * Step9. Database Error
 */
'use strict'

// Step7
// const cassandraDriver = require('cassandra-driver')
// const CASSANDRA_CONTACT_POINTS = [process.env.CASSANDRA_HOST || '127.0.0.1']
// const CASSANDRA_KEY_SPACE = 'my_db'

const fs = require('fs')

const DATA_FILE_NAME = `${__dirname}/data.csv`

class Lab6 {
  constructor () {
    this.fs = null
    this.cassandraClient = null
  }

  setFS (fs) {
    this.fs = fs || null

    return this
  }

  setCassandraClient (cassandraClient) {
    this.cassandraClient = cassandraClient || null

    return this
  }

  getDataFromDataBase () {
    // step7
    // const cassandraClient = new cassandraDriver.Client({ contactPoints: CASSANDRA_CONTACT_POINTS, keyspace: CASSANDRA_KEY_SPACE })
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
          Id: person[0],
          Name: person[1],
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
