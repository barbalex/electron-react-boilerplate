import moment from 'moment'

const sql1 = `
  INSERT INTO
    geschaefte (mutationsdatum, mutationsperson)
  VALUES
    (@now, @username)`
const sql2 = `
  SELECT
    *
  FROM
    geschaefte
  WHERE
    idGeschaeft = @idGeschaeft`

export default (db, username) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss')

  let result
  try {
    result = db.prepare(sql1).run({ now, username })
  } catch (error) {
    throw error
  }
  const idGeschaeft = result.lastInsertRowid

  // return full dataset
  let geschaeft = {}
  try {
    geschaeft = db.prepare(sql2).get({ idGeschaeft })
  } catch (error) {
    throw error
  }
  return geschaeft
}
