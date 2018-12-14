const sql = `
  DELETE FROM
    geschaefteKontakteIntern
  WHERE
    idGeschaeft = @idGeschaeft
    AND idKontakt = @idKontakt`

export default (db, idGeschaeft, idKontakt) => {
  try {
    db.prepare(sql).run({ idGeschaeft, idKontakt })
  } catch (error) {
    throw error
  }
}
