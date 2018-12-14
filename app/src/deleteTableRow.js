const sql = `
  DELETE FROM
    @table
  WHERE
    id = @id`

export default (db, table, id) => {
  try {
    db.prepare(sql).run({ table, id })
  } catch (error) {
    throw error
  }
}
