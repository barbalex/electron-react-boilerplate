const sql1 = `
  INSERT INTO
    geschaefteKontakteExtern (idGeschaeft, idKontakt)
  VALUES
    (@idGeschaeft, @idKontakt)`
const sql2 = `
  SELECT
    *
  FROM
    geschaefteKontakteExtern
  WHERE
    idGeschaeft = @idGeschaeft
    AND idKontakt = @idKontakt`

export default (db, idGeschaeft, idKontakt) => {
  try {
    db.prepare(sql1).run({ idGeschaeft, idKontakt })
  } catch (error) {
    throw error
  }

  let geschaeftKontaktExtern = {}
  try {
    geschaeftKontaktExtern = db.prepare(sql2).get({ idGeschaeft, idKontakt })
  } catch (error) {
    throw error
  }
  return geschaeftKontaktExtern
}
