import app from 'ampersand-app'
import getTableRowFromDb from './getTableRowFromDb'

export default (db, table) => new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO
        @table (id)
      VALUES
        (NULL)`

    let result
    try {
      db.prepare(sql).run({ table })
    } catch (error) {
      return app.store.tableGetError(error)
    }
    const id = result.lastInsertRowid
    // return full dataset
    getTableRowFromDb(db, table, id)
      .then(row => resolve(row))
      .catch(err => app.store.tableGetError(err))
  })
