export default (db, idGeschaeft) => {
  try {
    db.pragma('foreign_keys = ON')
  } catch (error) {
    throw error
  }

  try {
    db.prepare(
      `
      DELETE FROM
        geschaefte
      WHERE
        idGeschaeft = ${idGeschaeft}`,
    ).run()
  } catch (error) {
    throw error
  }
  return true
}
