import moment from 'moment'
import getGeschaeftFromDb from './getGeschaeftFromDb.js'

export default function (db, username) {
  return new Promise((resolve, reject) => {
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    const sql = `
      INSERT INTO
        geschaefte (mutationsdatum, mutationsperson)
      VALUES
        ('${now}', '${username}')`

    /*
     * This is weird:
     * node-sqlite3 returns the new ID
     * in the 'this' object of the callback function,
     * NOT in the result
     * so DO NOT USE ARROW FUNCTION
     */
    db.run(sql, function callback(error) {
      if (error) reject(error)
      const idGeschaeft = this.lastID
      // return full dataset
      getGeschaeftFromDb(db, idGeschaeft)
        .then(geschaeft => resolve(geschaeft))
        .catch(err => reject(err))
    })
  })
}
