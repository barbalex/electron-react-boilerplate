export default (db, idGeschaeft, idKontakt) => {
  let result = {}
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
      .get()
  } catch (error) {
    throw error
  }
  return result
}
