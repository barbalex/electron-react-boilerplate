const sql = `
  SELECT
    status
  FROM
    status
  WHERE
    geschaeftKannFaelligSein = 1`

export default db => {
  let options = []
  try {
    options = db.prepare(sql).all()
  } catch (error) {
    throw error
  }
  options = result.map(res => res.status)
  return options
}
