export default function(db, table, id, field, value) {
  const sql = `
      UPDATE
        @table
      SET
        @field = @value
      WHERE
        id = @id`
  try {
    db.prepare(sql).run({ table, field, value, id })
  } catch (error) {
    throw error
  }
}
