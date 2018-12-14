const sql = `
  SELECT
    *
  FROM
    @table`

export default (db, table) => {
  let result
  try {
    result = db.prepare(sql).all({ table })
  } catch (error) {
    throw error
  }
  return result
}
