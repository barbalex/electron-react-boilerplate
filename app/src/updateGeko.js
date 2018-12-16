export default (db, idGeschaeft, gekoNr, field, value) => {
  try {
    db.prepare(
      `
      UPDATE
        geko
      SET
        ${field} = ${value}
      WHERE
        idGeschaeft = ${idGeschaeft} AND
        gekoNr = ${gekoNr}`,
    ).run()
  } catch (error) {
    throw error
  }
  return true
}
