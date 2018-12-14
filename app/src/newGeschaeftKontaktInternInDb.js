const sql1 = `
  INSERT INTO
    geschaefteKontakteIntern (idGeschaeft, idKontakt)
  VALUES
    (@idGeschaeft, @idKontakt)`
const sql2 = `
  SELECT
    *
  FROM
    geschaefteKontakteIntern
  WHERE
    idGeschaeft = @idGeschaeft
    AND idKontakt = @idKontakt`

export default (db, idGeschaeft, idKontakt) => {
  try {
    db.prepare(sql1).run({ idGeschaeft, idKontakt })
  } catch (error) {
    throw error
  }
  // return full dataset
  let result
  try {
    result = db.prepare(sql2).all({ idGeschaeft, idKontakt })
  } catch (error) {
    throw error
  }
  return result
}
