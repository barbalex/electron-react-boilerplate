export default function(db, idGeschaeft, idKontakt) {
  const sql = `
    DELETE FROM
      geschaefteKontakteIntern
    WHERE
      idGeschaeft = @idGeschaeft
      AND idKontakt = @idKontakt`

  try {
    db.prepare(sql).run({ idGeschaeft, idKontakt })
  } catch (error) {
    throw error
  }
}
