export default (db, idGeschaeft, idKontakt) => {
  try {
    db.prepare(
      `
      DELETE FROM
        geschaefteKontakteExtern
      WHERE
        idGeschaeft = ${idGeschaeft}
        AND idKontakt = ${idKontakt}`,
    ).run()
  } catch (error) {
    throw error
  }
  return true
}
