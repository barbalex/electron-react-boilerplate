const sql = `
  UPDATE
    geko
  SET
    @field = @value
  WHERE
    idGeschaeft = @idGeschaeft AND
    gekoNr = @gekoNr`

export default function(db, idGeschaeft, gekoNr, field, value) {
  try {
    db.prepare(sql).run({ field, value, idGeschaeft, gekoNr })
  } catch (error) {
    throw error
  }
  return true
}
