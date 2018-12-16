export default (db, table, id) => {
  try {
    db.prepare(
      `
      DELETE FROM
        ${table}
      WHERE
        id = ${id}`,
    ).run()
  } catch (error) {
    throw error
  }
}
