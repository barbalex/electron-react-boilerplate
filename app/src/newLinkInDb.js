const sql1 = `
  INSERT INTO
    links (idGeschaeft, url)
  VALUES
    (@idGeschaeft, @url)`
const sql2 = `
  SELECT
    *
  FROM
    links
  WHERE
    idGeschaeft = @idGeschaeft AND
    url = @url`

export default function(db, idGeschaeft, url) {
  try {
    db.prepare(sql1).run({ idGeschaeft, url })
  } catch (error) {
    throw error
  }
  // return full dataset
  let result
  try {
    result = db.prepare(sql2).get({ idGeschaeft, url })
  } catch (error) {
    throw error
  }
  return result
}
