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
  return options.map(res => res.status)
}
