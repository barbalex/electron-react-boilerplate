import app from 'ampersand-app'

const sql1 = `
  INSERT INTO
    @table (id)
  VALUES
    (NULL)`
const sql2 = `
  SELECT
    *
  FROM
    @table
  WHERE
    id = @id`

export default (db, table) => {
  let result
  try {
    db.prepare(sql1).run({ table })
  } catch (error) {
    return app.store.tableGetError(error)
  }
  const id = result.lastInsertRowid
  // return full dataset
  let row
  try {
    row = db.prepare(sql2).all({ table, id })
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
