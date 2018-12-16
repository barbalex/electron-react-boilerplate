export default (db, idGeschaeft, gekoNr) => {
  try {
    db.prepare(
      `
      DELETE FROM
        geko
      WHERE
        idGeschaeft = ${idGeschaeft} AND
        gekoNr = ${gekoNr}`,
    ).run()
  } catch (error) {
    throw error
  }
  return true
}
