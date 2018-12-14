export default function(db, idGeschaeft, idKontakt) {
  const sql = `
      SELECT
        *
      FROM
        geschaefteKontakteExtern
      WHERE
        idGeschaeft = @idGeschaeft
        AND idKontakt = @idKontakt`

  let result = {}
  try {
    result = db.prepare(sql).get({ idGeschaeft, idKontakt })
  } catch (error) {
    throw error
  }
  return result
}
