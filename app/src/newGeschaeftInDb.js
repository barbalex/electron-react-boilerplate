import moment from 'moment'

export default (db, username) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss')

  let result
  try {
    result = db
      .prepare(
        `
        INSERT INTO
          geschaefte (mutationsdatum, mutationsperson)
        VALUES
          (${now}, ${username})`,
      )
      .run()
  } catch (error) {
    throw error
  }
  const idGeschaeft = result.lastInsertRowid

  // return full dataset
  let geschaeft = {}
  try {
    geschaeft = db
      .prepare(
        `
        SELECT
          *
        FROM
          geschaefte
        WHERE
          idGeschaeft = ${idGeschaeft}`,
      )
      .get()
  } catch (error) {
    throw error
  }
  return geschaeft
}
