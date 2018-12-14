const sql = `
  SELECT
    *
  FROM
    geschaefteKontakteIntern`

export default db => {
  let geschaefteKontakteIntern = []
  try {
    geschaefteKontakteIntern = db.prepare(sql).all()
  } catch (error) {
    throw error
  }
  return geschaefteKontakteIntern
}
