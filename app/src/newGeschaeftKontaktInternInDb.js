export default (db, idGeschaeft, idKontakt) => {
  try {
    db.prepare(
      `
      INSERT INTO
        geschaefteKontakteIntern (idGeschaeft, idKontakt)
      VALUES
        (${idGeschaeft}, ${idKontakt})`,
    ).run()
  } catch (error) {
    throw error
  }
  // return full dataset
  let result
  try {
    result = db
      .prepare(
        `
        SELECT
          *
        FROM
          geschaefteKontakteIntern
        WHERE
          idGeschaeft = ${idGeschaeft}
          AND idKontakt = ${idKontakt}`,
      )
      .all()
  } catch (error) {
    throw error
  }
  return result
}
