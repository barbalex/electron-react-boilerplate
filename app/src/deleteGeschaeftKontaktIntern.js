export default (db, idGeschaeft, idKontakt) => {
  try {
    db.prepare(
      `
      DELETE FROM
        geschaefteKontakteIntern
      WHERE
        idGeschaeft = ${idGeschaeft}
        AND idKontakt = ${idKontakt}`,
    ).run()
  } catch (error) {
    throw error
  }
}
