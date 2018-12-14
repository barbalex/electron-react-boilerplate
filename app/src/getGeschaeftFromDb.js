const sql = `
  SELECT
    *
  FROM
    geschaefte
  WHERE
    idGeschaeft = @idGeschaeft`

export default (db, idGeschaeft) => {
  let result = {}
  try {
    result = db.prepare(sql).get({ idGeschaeft })
  } catch (error) {
    throw error
  }
  return result
}
