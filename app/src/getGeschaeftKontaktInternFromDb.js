export default function(db, idGeschaeft, idKontakt) {
  const sql = `
    SELECT
      *
    FROM
      geschaefteKontakteIntern
    WHERE
      idGeschaeft = @idGeschaeft
      AND idKontakt = @idKontakt`

  let result
  try {
    result = db.prepare(sql).all({ idGeschaeft, idKontakt })
  } catch (error) {
    throw error
  }
  return result
}
