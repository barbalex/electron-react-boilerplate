const sql = `
  UPDATE
    @table
  SET
    @field = @value
  WHERE
    id = @id`

export default (db, table, id, field, value) => {
  try {
    db.prepare(sql).run({ table, field, value, id })
  } catch (error) {
    throw error
  }
}
