export default function(db, idGeschaeft, gekoNr) {
  const sql = `
      DELETE FROM
        geko
      WHERE
        idGeschaeft = @idGeschaeft AND
        gekoNr = @gekoNr`
  try {
    db.prepare(sql).run({ idGeschaeft, gekoNr })
  } catch (error) {
    throw error
  }
  return true
}
