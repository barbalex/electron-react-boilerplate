const sql = `
  SELECT
    *
  FROM
    interne
  ORDER BY
    kurzzeichen`

export default function(db) {
  let options = []
  try {
    options = db.prepare(sql).all()
  } catch (error) {
    throw error
  }
  return options
}
