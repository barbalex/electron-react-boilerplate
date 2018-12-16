export default (db, table, id, field, value) => {
  try {
    db.prepare(
      `
      UPDATE
        ${table}
      SET
        ${field} = ${value}
      WHERE
        id = ${id}`,
    ).run()
  } catch (error) {
    throw error
  }
}
