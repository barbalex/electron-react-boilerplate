export default (db, idGeschaeft, idKontakt) => {
  try {
    db.prepare(
      `
      INSERT INTO
        geschaefteKontakteExtern (idGeschaeft, idKontakt)
      VALUES
        (${idGeschaeft}, ${idKontakt})`,
    ).run()
  } catch (error) {
    throw error
  }

  let geschaeftKontaktExtern = {}
  try {
    geschaeftKontaktExtern = db
      .prepare(
        `
        SELECT
          *
        FROM
          geschaefteKontakteExtern
        WHERE
          idGeschaeft = ${idGeschaeft}
          AND idKontakt = ${idKontakt}`,
      )
      .get()
  } catch (error) {
    throw error
  }
  return geschaeftKontaktExtern
}
