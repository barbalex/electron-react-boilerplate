import getTableRowFromDb from './getTableRowFromDb'

export default function (db, table) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO
        ${table} (id)
      VALUES
        (NULL)`

    /*
     * This is weird:
     * node-sqlite3 returns the new ID
     * in the 'this' object of the callback function,
     * NOT in the result
     * so DO NOT USE ARROW FUNCTION
     */
    db.run(sql, function callback(error) {
      if (error) reject(error)
      const id = this.lastID
      // return full dataset
      getTableRowFromDb(db, table, id)
        .then(row => resolve(row))
        .catch(err => reject(err))
    })
  })
}
