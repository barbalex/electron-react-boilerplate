import app from 'ampersand-app'

export default (db, table) => {
  let result
  try {
    db.prepare(`INSERT INTO ${table} (id) VALUES (NULL)`).run()
  } catch (error) {
    return app.store.tableGetError(error)
  }
  const id = result.lastInsertRowid
  // return full dataset
  let row
  try {
    row = db.prepare(`SELECT * FROM ${table} WHERE id = ${id}`).all()
  } catch (error) {
    throw error
  }
  // react does not want to get null values
  Object.keys(row).forEach(key => {
    if (row[key] === null) {
      row[key] = ''
    }
  })
  return row
}
