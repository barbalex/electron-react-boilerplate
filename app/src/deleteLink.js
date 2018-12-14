const sql = `
  DELETE FROM
    links
  WHERE
    idGeschaeft = @idGeschaeft AND
    url = @url`

export default (db, idGeschaeft, url) => {
  try {
    db.prepare(sql).run({ idGeschaeft, url })
  } catch (error) {
    throw error
  }
}
