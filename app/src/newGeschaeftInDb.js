import moment from 'moment'
import getGeschaeftFromDb from './getGeschaeftFromDb'

export default function(db, username) {
  const now = moment().format('YYYY-MM-DD HH:mm:ss')
  const sql = `
      INSERT INTO
        geschaefte (mutationsdatum, mutationsperson)
      VALUES
        (@now, @username)`

  let result
  try {
    result = db.prepare(sql).run({ now, username })
  } catch (error) {
    throw error
  }
  const idGeschaeft = result.lastInsertRowid

  // return full dataset
  let geschaeft
  try {
    geschaeft = getGeschaeftFromDb(db, idGeschaeft)
  } catch (error) {
    throw error
  }
  return geschaeft
}
