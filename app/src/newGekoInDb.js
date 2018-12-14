const sql1 = `
  INSERT INTO
    geko (idGeschaeft, gekoNr)
  VALUES
    (@idGeschaeft, @gekoNr)`
const sql2 = `
  SELECT
    *
  FROM
    geko
  WHERE
    idGeschaeft = @idGeschaeft AND
    gekoNr = @gekoNr`

export default (db, idGeschaeft, gekoNr) => {
  try {
    db.prepare(sql1).run({ idGeschaeft, gekoNr })
  } catch (error) {
    throw error
  }

  // return full dataset
  let geko
  try {
    geko = db.prepare(sql2).get({ idGeschaeft, gekoNr })
  } catch (error) {
    throw error
  }
  return geko
}
