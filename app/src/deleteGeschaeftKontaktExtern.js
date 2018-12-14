export default (db, idGeschaeft, idKontakt) => {
  const sql = `
    DELETE FROM
      geschaefteKontakteExtern
    WHERE
      idGeschaeft = @idGeschaeft
      AND idKontakt = @idKontakt`

  try {
    db.prepare(sql).run({ idGeschaeft, idKontakt })
  } catch (error) {
    throw error
  }
  return true
}
