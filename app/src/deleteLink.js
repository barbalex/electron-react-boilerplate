export default function(db, idGeschaeft, url) {
  const sql = `
    DELETE FROM
      links
    WHERE
      idGeschaeft = @idGeschaeft AND
      url = @url`

  try {
    db.prepare(sql).run({ idGeschaeft, url })
  } catch (error) {
    throw error
  }
}
