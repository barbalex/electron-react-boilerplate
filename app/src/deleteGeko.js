const sql = `
  DELETE FROM
    geko
  WHERE
    idGeschaeft = @idGeschaeft AND
    gekoNr = @gekoNr`

export default (db, idGeschaeft, gekoNr) => {
  try {
    db.prepare(sql).run({ idGeschaeft, gekoNr })
  } catch (error) {
    throw error
  }
  return true
}
